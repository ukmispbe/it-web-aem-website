package com.waters.aem.core.maintenance.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.Objects;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobExecutionContext;
import org.apache.sling.event.jobs.consumer.JobExecutionResult;
import org.apache.sling.event.jobs.consumer.JobExecutor;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.granite.maintenance.MaintenanceConstants;
import com.waters.aem.core.services.ResourceResolverService;

@Component(immediate = true, service = JobExecutor.class, property = {
		MaintenanceConstants.PROPERTY_TASK_NAME + "=" + "HybrisAuditLogPurgeTask",
		MaintenanceConstants.PROPERTY_TASK_TITLE + "=" + "Hybris Audit Log Purge",
		MaintenanceConstants.PROPERTY_TASK_MANDATORY + "=" + "true",
		JobExecutor.PROPERTY_TOPICS + "=" + MaintenanceConstants.TASK_TOPIC_PREFIX + "HybrisAuditLogPurgeTask" })
@Designate(ocd = HybrisAuditLogPurge.HybrisAuditLogPurgeConfiguration.class)
public class HybrisAuditLogPurge implements JobExecutor {

	@Reference
	private ResourceResolverService resolverService;

	private ResourceResolver resourceResolver;

	private static final Logger LOG = LoggerFactory.getLogger(HybrisAuditLogPurge.class);

	private String ruleName;
	private String path;
	private Integer minimumAge;

	private static final String DATE_FORMAT_YEAR = "yyyy";
	private static final String DATE_FORMAT_MONTH = "MM";
	private static final String DATE_FORMAT_DAY = "dd";

	private String reducedYear;
	private String reducedMonth;
	private String reducedDay;

	@Activate
	@Modified
	private void activate(HybrisAuditLogPurgeConfiguration config) {
		this.ruleName = config.getRuleName();
		this.path = config.getPath();
		this.minimumAge = config.getMinimumAge();
		try {
			resourceResolver = resolverService.getResourceResolver("watersService");
		} catch (LoginException loginException) {
			LOG.error("Error: unable to get Resource Resolver in for Hybris Audit logpurge {}",
					loginException.getMessage());
		}
	}

	@Override
	public JobExecutionResult process(Job job, JobExecutionContext context) {
		if (resourceResolver != null && path != null && minimumAge != null) {
			LOG.info("Hybris Audit Log Purge Rule Name : {}", ruleName);
			reducedYear = getReducedCalendar(DATE_FORMAT_YEAR);
			reducedMonth = getReducedCalendar(DATE_FORMAT_MONTH);
			reducedDay = getReducedCalendar(DATE_FORMAT_DAY);
			try {
				final Resource resource = resourceResolver.resolve(path);
				int count = 0;
				deleteHybrisAuditLogs(resource, count);
				LOG.info("Deleted the Hybris Audit Logs before {}-{}-{}", reducedDay, reducedMonth, reducedYear);
			} catch (NumberFormatException | RepositoryException e) {
				LOG.error("Error: Repository Exception in for Hybris Audit logpurge {}", e.getMessage());
			}
		}
		return context.result().message("Deleted the Hybris Audit Logs").succeeded();
	}

	private Date getDateVariation(Integer minimumAge, Date currentDate) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(currentDate);
		calendar.add(Calendar.DAY_OF_YEAR, -(minimumAge));
		return calendar.getTime();
	}

	private void deleteHybrisAuditLogsNodes(final Node node) {
		if (node != null && resourceResolver != null) {
			try {
				node.remove();
				resourceResolver.commit();
			} catch (RepositoryException | PersistenceException e) {
				LOG.error("Error : Exception occurred in for Hybris Audit logpurge {}", e.getMessage());
			}
		}
	}

	private String getReducedCalendar(String dateFormat) {
		final Date date = new Date();
		Date reducedDate = getDateVariation(minimumAge, date);
		return new SimpleDateFormat(dateFormat).format(reducedDate.getTime());
	}

	private void deleteHybrisAuditLogs(final Resource resource, int count)
			throws NumberFormatException, RepositoryException {
		count++;
		String reducedDateValue = getReducedDateValue(count);
		Iterator<Resource> children = Objects.requireNonNull(resource).listChildren();
		while (children.hasNext()) {
			Resource childResource = children.next();
			Node node = childResource.adaptTo(Node.class);
			if (node != null && Integer.parseInt(node.getName()) < Integer.parseInt(reducedDateValue)) {
				deleteHybrisAuditLogsNodes(node);
			} else if (node != null && Integer.parseInt(node.getName()) > Integer.parseInt(reducedDateValue)) {
				LOG.info("Node deletion skipped for {}", node.getPath());
			} else {
				if (count < 3) {
					deleteHybrisAuditLogs(childResource, count);
				}
			}
		}
	}

	private String getReducedDateValue(int count) {
		switch (count) {
		case 2:
			return reducedMonth;
		case 3:
			return reducedDay;
		default:
			return reducedYear;
		}
	}

	@ObjectClassDefinition(name = "Hybris Audit Log Purge Task")
	public @interface HybrisAuditLogPurgeConfiguration {

		@AttributeDefinition(name = "Rule Name", description = "The name of the Audit Policy Rule")
		String getRuleName() default "Hybris Audit Purge";

		@AttributeDefinition(name = "Path of Audits to be Deleted", description = "Enter the Path of the Audit Logs Folders to be Deleted")
		String getPath() default "/var/waters/hybris-importer/jcr:content/audit";

		@AttributeDefinition(name = "Minimum Age for days Audits to be Deleted", description = "How long the Audit Folders to be kept (in days)")
		int getMinimumAge() default 60;
	}

}