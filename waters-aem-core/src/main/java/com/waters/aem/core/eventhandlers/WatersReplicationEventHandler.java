package com.waters.aem.core.eventhandlers;

import com.adobe.granite.workflow.PayloadMap;
import com.day.cq.commons.Externalizer;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowService;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.model.WorkflowModel;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.ResourceResolverService;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.event.jobs.NotificationConstants;
import org.apache.sling.settings.SlingSettingsService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.Collections;
import java.util.Set;
import org.osgi.service.event.EventConstants;

/**
 * @author murmahat
 * 
 *         This is an custom Event Handler which gets triggered whenever any
 *         page under /content/waters or /content/order is activated or
 *         deactivated. This calls the Waters Publish or Unpublish Notification
 *         Workflow based on the replication action. These workflow sends email
 *         to the global and regional content approvers about the page
 *         activated/deactivated.
 * 
 */
@Component(immediate = true, service = EventHandler.class, property = {
		EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED, EventConstants.EVENT_FILTER + "=("
				+ NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)" })
@Designate(ocd = WatersReplicationEventHandler.WatersReplicationEventHandlerConfiguration.class)
public class WatersReplicationEventHandler implements EventHandler {

	private Logger log = LoggerFactory.getLogger(WatersReplicationEventHandler.class);

	private Set<String> runmodes = Collections.emptySet();

	@Reference
	private SlingSettingsService slingSettingsService;

	@Reference
	private WorkflowService workflowService;

	@Reference
	private ResourceResolverService resolverService;

	private ResourceResolver resourceResolver;

	private String publishWorkflowPath = null;

	private String unpublishWorkflowPath = null;

	public void handleEvent(Event event) {
		if (runmodes.contains(Externalizer.AUTHOR)) {
			log.trace("Replication Event triggered on author.");
			final String actionInitiatorId = event.containsProperty("cq:user") ? event.getProperty("cq:user").toString()
					: null;
			final String actionPath = event.containsProperty("cq:path") ? event.getProperty("cq:path").toString()
					: null;
			final String actionType = event.containsProperty("cq:type") ? event.getProperty("cq:type").toString()
					: null;
			if (actionInitiatorId != null && actionPath != null && actionType != null && resourceResolver != null) {
				final String userId = actionInitiatorId;
				log.debug("Replication action {} at path {} ", actionType, actionPath);
				final Resource resource = resourceResolver.resolve(actionPath);
				if (resource != null && resource.getResourceType().equalsIgnoreCase(NameConstants.NT_PAGE)
						&& (actionPath.contains(WatersConstants.ROOT_PATH)
								|| actionPath.contains(WatersConstants.ORDER_ROOT_PATH))) {
					if (ReplicationActionType.ACTIVATE == ReplicationActionType.fromName(actionType)
							&& publishWorkflowPath != null) {
						initiateWorkflow(publishWorkflowPath, userId, actionPath);
					} else if (ReplicationActionType.DEACTIVATE == ReplicationActionType.fromName(actionType)
							&& unpublishWorkflowPath != null) {
						initiateWorkflow(unpublishWorkflowPath, userId, actionPath);
					}
				}
			}
		}
	}

	/**
	 * This method is used to call the Waters Publish or Unpublish Notification
	 * Workflow based on the replication action. It takes workflowModelPath, userId
	 * and payloadPath as parameters.
	 * 
	 * @param wfModelPath
	 * @param userId
	 * @param payloadPath
	 */
	private void initiateWorkflow(final String wfModelPath, final String userId, final String payloadPath) {
		try {
			log.debug("Attempting to configure workflow");
			final Session adminSession = resourceResolver.adaptTo(Session.class);
			WorkflowSession wfSession = workflowService.getWorkflowSession(adminSession);

			WorkflowModel wfModel = wfSession.getModel(wfModelPath);
			if (wfModel != null) {
				WorkflowData wfData = wfSession.newWorkflowData(PayloadMap.TYPE_JCR_PATH, payloadPath);
				wfData.getMetaDataMap().put("initiator", userId);
				wfSession.startWorkflow(wfModel, wfData);
				log.debug("Starting workflow using model: {}", wfModel.getId());
			} else {
				log.warn("No workflow model found. Skipping transaction.");
			}
		} catch (WorkflowException wfException) {
			log.error("Error starting workflow.", wfException);
		}
	}

	@Activate
	@Modified
	protected void activate(final WatersReplicationEventHandlerConfiguration config) {
		runmodes = slingSettingsService.getRunModes();
		this.publishWorkflowPath = config.getPublishWorkflowPath();
		this.unpublishWorkflowPath = config.getUnpublishWorkflowPath();
		try {
			resourceResolver = resolverService.getResourceResolver("watersService");
		} catch (LoginException loginException) {
			log.error("Error with login exception.", loginException);
		}
	}

	@ObjectClassDefinition(name = "Waters Publish/Unpublish Notification Workflow Configuration")
	public @interface WatersReplicationEventHandlerConfiguration {

		@AttributeDefinition(name = "Waters Publish Notification Workflow Path")
		String getPublishWorkflowPath() default "/var/workflow/models/waters-publish-notification-workflow";

		@AttributeDefinition(name = "Waters Unpublish Notification Workflow Path")
		String getUnpublishWorkflowPath() default "/var/workflow/models/waters-unpublish-notification-workflow";
	}

}