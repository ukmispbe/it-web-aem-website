package com.waters.aem.hybris.replication.impl;

import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.replication.Replicator;
import com.google.common.collect.ImmutableMap;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.hybris.enums.HybrisImportContentType;
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
            .put(HybrisImportStatus.CREATED, ReplicationActionType.ACTIVATE)
            .put(HybrisImportStatus.MOVED, ReplicationActionType.ACTIVATE)
            .put(HybrisImportStatus.UPDATED, ReplicationActionType.ACTIVATE)
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
            for (final Map.Entry<HybrisImportStatus, List<HybrisImporterResult>> entry : groupedResults.entrySet()) {
                replicateResultsForStatus(resourceResolver, entry.getKey(), entry.getValue());
            }
        } catch (LoginException | ReplicationException e) {
            LOG.error("error replicating hybris importer results", e);

            throw new HybrisImporterException(e);
        }
    }

    private void replicateResultsForStatus(final ResourceResolver resourceResolver, final HybrisImportStatus status,
        final List<HybrisImporterResult> results) throws ReplicationException {
        final ReplicationActionType replicationActionType = REPLICATION_ACTION_TYPES.get(status);

        if (replicationActionType == null) {
            LOG.info("no replication action type for status : {}, ignoring", status);
        } else {
            final Map<HybrisImportContentType, List<HybrisImporterResult>> groupedResults = results
                .stream()
                .collect(Collectors.groupingBy(HybrisImporterResult :: getContentType));

            for (final Map.Entry<HybrisImportContentType, List<HybrisImporterResult>> entry : groupedResults
                .entrySet()) {
                replicateResultsForContentType(resourceResolver, replicationActionType, entry.getKey(),
                    entry.getValue());
            }
        }
    }

    private void replicateResultsForContentType(final ResourceResolver resourceResolver,
        final ReplicationActionType replicationActionType, final HybrisImportContentType contentType,
        final List<HybrisImporterResult> resultsForContentType) throws ReplicationException {
        final Session session = resourceResolver.adaptTo(Session.class);

        LOG.info("replicating {} paths for content type : {} with action type : {}", resultsForContentType.size(),
            contentType, replicationActionType.getName());

        if (HybrisImportContentType.PRODUCT.equals(contentType)) {
            // always activate product nodes
            for (final HybrisImporterResult result : resultsForContentType) {
                replicator.replicate(session, replicationActionType, result.getPath());
            }
        } else {
            // TODO verify if page activation is required
            final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

            for (final HybrisImporterResult result : resultsForContentType) {
                final PageDecorator page = pageManager.getPage(result.getPath());

                // activate only if page was previously activated
                if (isPublished(page)) {
                    replicator.replicate(session, replicationActionType, result.getPath());
                } else {
                    LOG.debug("page was not previously activated for result : {}, ignoring", result);
                }
            }
        }
    }

    private boolean isPublished(final PageDecorator page) {
        final ReplicationStatus replicationStatus = page.adaptTo(ReplicationStatus.class);

        return replicationStatus != null && replicationStatus.getLastPublished() != null;
    }
}
