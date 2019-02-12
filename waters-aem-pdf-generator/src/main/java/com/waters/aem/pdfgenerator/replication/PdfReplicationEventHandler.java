package com.waters.aem.pdfgenerator.replication;

import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationEvent;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

/**
 * Replication event handler to create or delete Application Note PDFs when pages are activated or deactivated.
 */
@Component(service = EventHandler.class, property = {
    EventConstants.EVENT_TOPIC + "=" + ReplicationEvent.EVENT_TOPIC, // event fired in publish
    EventConstants.EVENT_TOPIC + "=" + ReplicationAction.EVENT_TOPIC // event fired in author
})
public final class PdfReplicationEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(PdfReplicationEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private PdfGenerator pdfGenerator;

    @Override
    public void handleEvent(final Event event) {
        final ReplicationEvent replicationEvent = ReplicationEvent.fromEvent(event);

        if (replicationEvent == null) { // author event (CQ)
            final String[] paths = ArrayUtils.nullToEmpty(
                (String[]) event.getProperty(ReplicationAction.PROPERTY_PATHS));

            LOG.info("event topic : {}, paths : {}", event.getTopic(), Arrays.asList(paths));
        } else { // publish event (granite)
            final ReplicationAction replicationAction = replicationEvent.getReplicationAction();
            final ReplicationActionType replicationActionType = replicationAction.getType();

            LOG.info("event topic : {}, replication action : {}", event.getTopic(), replicationAction);
        }
    }
}
