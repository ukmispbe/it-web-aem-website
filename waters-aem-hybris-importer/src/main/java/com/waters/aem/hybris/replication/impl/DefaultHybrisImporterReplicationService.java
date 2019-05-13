package com.waters.aem.hybris.replication.impl;

import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.google.common.collect.ImmutableMap;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.replication.HybrisImporterReplicationService;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component(service = HybrisImporterReplicationService.class)
public final class DefaultHybrisImporterReplicationService implements HybrisImporterReplicationService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisImporterReplicationService.class);

    private static final Map<HybrisImportStatus, ReplicationActionType> REPLICATION_ACTION_TYPES =
        new ImmutableMap.Builder<HybrisImportStatus, ReplicationActionType>()
            // .put(HybrisImportStatus.CREATED, ReplicationActionType.ACTIVATE)
            // .put(HybrisImportStatus.UPDATED, ReplicationActionType.ACTIVATE)
            .put(HybrisImportStatus.DELETED, ReplicationActionType.DEACTIVATE)
            .build();

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private Replicator replicator;

    @Override
    public void replicate(final List<HybrisImporterResult> results) {
        final Map<HybrisImportStatus, List<HybrisImporterResult>> groupedResults = results.stream().collect(
            Collectors.groupingBy(HybrisImporterResult :: getStatus));

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Session session = resourceResolver.adaptTo(Session.class);

            for (final Map.Entry<HybrisImportStatus, List<HybrisImporterResult>> entry : groupedResults.entrySet()) {
                replicateResultsForStatus(session, entry.getKey(), entry.getValue());
            }
        } catch (LoginException | ReplicationException e) {
            LOG.error("error replicating hybris importer results", e);

            throw new HybrisImporterException(e);
        }
    }

    private void replicateResultsForStatus(final Session session, final HybrisImportStatus status,
        final List<HybrisImporterResult> results) throws ReplicationException {
        final ReplicationActionType replicationActionType = REPLICATION_ACTION_TYPES.get(status);

        if (replicationActionType == null) {
            LOG.info("no replication action type for status : {}, ignoring", status);
        } else {
            LOG.info("replicating {} paths with action type : {}", results.size(),
                replicationActionType.getName());

            for (final HybrisImporterResult result : results) {
                replicator.replicate(session, replicationActionType, result.getPath());
            }
        }
    }
}
