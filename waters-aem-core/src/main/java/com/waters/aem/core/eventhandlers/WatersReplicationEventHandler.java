package com.waters.aem.core.eventhandlers;

import com.adobe.granite.workflow.PayloadMap;
import com.day.cq.replication.ReplicationAction;
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
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.settings.SlingSettingsService;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.Collections;
import java.util.Set;
import org.osgi.framework.Constants;
import org.osgi.service.event.EventConstants;

@Component(immediate = true, service = EventHandler.class, property = {
		Constants.SERVICE_DESCRIPTION + "=Waters Activation/Deactivation Event Handler ",
		EventConstants.EVENT_TOPIC + "=" + ReplicationAction.EVENT_TOPIC })
public class WatersReplicationEventHandler implements EventHandler {

	private Logger log = LoggerFactory.getLogger(this.getClass());

	private BundleContext bundleContext;

	private Set<String> runmodes = Collections.emptySet();

	@Reference
	private SlingSettingsService slingSettingsService;

	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	@Reference
	private WorkflowService workflowService;

	@Reference
	private ResourceResolverService resolverService;

	private ResourceResolver resourceResolver;

	public static final String AUTHOR_RUN_MODE = "author";

	public void handleEvent(Event event) {
		if (runmodes.contains(AUTHOR_RUN_MODE) && resourceResolver != null) {
			log.trace("Replication Event triggered on author");
			final ReplicationAction action = ReplicationAction.fromEvent(event);
			if (action != null) {
				final String userId = action.getUserId();
				log.debug("Replication action {} at path {} ", action.getType().getName(), action.getPath());
				final Resource resource = resourceResolver.resolve(action.getPath());
				if (resource != null) {
					if (resource.getResourceType().equalsIgnoreCase(NameConstants.NT_PAGE)
							&& (action.getPath().contains(WatersConstants.ROOT_PATH)
									|| action.getPath().contains(WatersConstants.ORDER_ROOT_PATH))) {
						if (ReplicationActionType.ACTIVATE == action.getType()) {
							performWorkflow("/var/workflow/models/waters_publish_notification_workflow", userId,
									action.getPath());
							System.out.println("Activate Workflow Triggered");
						} else if (ReplicationActionType.DEACTIVATE == action.getType()) {
							performWorkflow("/var/workflow/models/waters_unpublish_notification_workflow", userId,
									action.getPath());
							System.out.println("Deactivate Workflow Triggered");
						}
					}
				}
			}
		}
	}

	private void performWorkflow(final String model, final String userId, final String path) {
		try {
			log.debug("Attempting to configure workflow");
			final Session adminSession = resourceResolver.adaptTo(Session.class);
			WorkflowSession wfSession = workflowService.getWorkflowSession(adminSession);

			WorkflowModel wfModel = wfSession.getModel(model);
			if (wfModel != null) {
				WorkflowData wfData = wfSession.newWorkflowData(PayloadMap.TYPE_JCR_PATH, path);
				wfData.getMetaDataMap().put("initiator", userId);
				log.debug("Starting workflow using model: {}", wfModel.getId());
				wfSession.startWorkflow(wfModel, wfData);
			} else {
				log.warn("No workflow model found. Skipping transaction.");
			}
		} catch (WorkflowException ex) {
			log.error("Error starting workflow.", ex);
		}
	}

	@Activate
	protected void activate(ComponentContext ctx) {
		this.bundleContext = ctx.getBundleContext();
		runmodes = slingSettingsService.getRunModes();
		try {
			resourceResolver = resolverService.getResourceResolver("watersService");
		} catch (LoginException e) {
			e.printStackTrace();
		}
	}

	@Deactivate
	protected void deactivate(ComponentContext ctx) {
		this.bundleContext = null;
		if (resourceResolver != null && resourceResolver.isLive()) {
			resourceResolver.close();
			resourceResolver = null;
		}
	}

}