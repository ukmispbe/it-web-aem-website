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

	@Activate
	@Modified
	private void activate(HybrisAuditLogPurgeConfiguration config) {
		this.ruleName = config.getRuleName();
		this.path = config.getPath();
		this.minimumAge = config.getMinimumAge();
		try {
			resourceResolver = resolverService.getResourceResolver("watersService");
		} catch (LoginException loginException) {
			LOG.error("Error: unable to get Resource Resolver in for Hybris Audit logpurge {}", loginException.getMessage());
		}
	}

	@Override
	public JobExecutionResult process(Job job, JobExecutionContext context) {
		if (resourceResolver != null && path != null && minimumAge != null) {
			LOG.info("Hybris Audit Log Purge Rule Name : {}", ruleName);
			final String reducedYear = getReducedCalendar(DATE_FORMAT_YEAR);
			final String reducedMonth = getReducedCalendar(DATE_FORMAT_MONTH);
			final String reducedDay = getReducedCalendar(DATE_FORMAT_DAY);
			final Resource auditResource = resourceResolver.resolve(path);
			Iterator<Resource> auditChildren = Objects.requireNonNull(auditResource).listChildren();
			while (auditChildren.hasNext()) {
				Resource yearResource = auditChildren.next();
				Node yearNode = yearResource.adaptTo(Node.class);
				try {
					if (yearNode != null && Integer.parseInt(yearNode.getName()) < Integer.parseInt(reducedYear)) {
						deleteHybrisAuditLogsNodes(yearNode);
					} else if (yearNode != null
							&& Integer.parseInt(yearNode.getName()) > Integer.parseInt(reducedYear)) {
						LOG.info("Year Node deletion skipped {}", yearNode.getName());
					} else {
						Iterator<Resource> yearChildren = Objects.requireNonNull(yearResource).listChildren();
						while (yearChildren.hasNext()) {
							Resource monthResource = yearChildren.next();
							Node monthNode = monthResource.adaptTo(Node.class);
							if (monthNode != null
									&& Integer.parseInt(monthNode.getName()) < Integer.parseInt(reducedMonth)) {
								deleteHybrisAuditLogsNodes(monthNode);
							} else if (monthNode != null
									&& Integer.parseInt(monthNode.getName()) > Integer.parseInt(reducedMonth)) {
								LOG.info("Year Month Node deletion skipped {} {}", yearNode.getName(),
										monthNode.getName());
							} else {
								Iterator<Resource> monthChildren = Objects.requireNonNull(monthResource).listChildren();
								while (monthChildren.hasNext()) {
									Resource dayResource = monthChildren.next();
									Node dayNode = dayResource.adaptTo(Node.class);
									if (dayNode != null
											&& Integer.parseInt(dayNode.getName()) < Integer.parseInt(reducedDay)) {
										deleteHybrisAuditLogsNodes(dayNode);
									}
								}
							}
						}
					}
				} catch (RepositoryException e) {
					LOG.error("Error: Repository Exception in for Hybris Audit logpurge {}", e.getMessage());
				}
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