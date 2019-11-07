package com.waters.aem.hybris.replication.impl;

import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.replication.Replicator;
import com.google.common.collect.ImmutableMap;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.hybris.enums.HybrisImportContentType;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.notification.HybrisImporterNotificationService;
import com.waters.aem.hybris.replication.HybrisImporterReplicationService;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Component(service = HybrisImporterReplicationService.class)
@Designate(ocd = HybrisImporterReplicationConfiguration.class)
public final class DefaultHybrisImporterReplicationService implements HybrisImporterReplicationService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisImporterReplicationService.class);

    private static final Map<HybrisImportStatus, ReplicationActionType> REPLICATION_ACTION_TYPES =
        new ImmutableMap.Builder<HybrisImportStatus, ReplicationActionType>()
            .put(HybrisImportStatus.CREATED, ReplicationActionType.ACTIVATE)
            .put(HybrisImportStatus.UPDATED, ReplicationActionType.ACTIVATE)
            .put(HybrisImportStatus.DELETED, ReplicationActionType.DEACTIVATE)
            .build();

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private Replicator replicator;

    private volatile List<HybrisImporterNotificationService> notificationServices = new CopyOnWriteArrayList<>();

    private volatile boolean limit;

    private volatile int limitThreshold;

    @Override
    public void replicate(final List<HybrisImporterResult> results, final boolean force) {
        // filter out language master pages from replication
        final List<HybrisImporterResult> filteredResults = results.stream()
                .filter(result -> !isLanguageMasterPage(result.getPath()))
                .collect(Collectors.toList());

        final Map<HybrisImportStatus, List<HybrisImporterResult>> groupedResults = filteredResults.stream().collect(
            Collectors.groupingBy(HybrisImporterResult :: getStatus));

        if (!force && limit && filteredResults.size() > limitThreshold) {
            // don't automatically activate if threshold limit is reached
            LOG.debug("hybris item activation limit exceeded with {} items. sending notification",
                    filteredResults.size());

            notificationServices.forEach(service -> service.notifyToReplicate(limitThreshold, filteredResults));
        } else {
            try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
                for (final Map.Entry<HybrisImportStatus, List<HybrisImporterResult>> entry : groupedResults.entrySet()) {
                    replicateResultsForStatus(resourceResolver, entry.getKey(), entry.getValue());
                }
            } catch (LoginException | ReplicationException e) {
                LOG.error("error replicating hybris importer results", e);

                throw new HybrisImporterException(e);
            }
        }

    }

    @Override
    public boolean isLimit() {
        return limit;
    }

    @Override
    public int getLimitThreshold() {
        return limitThreshold;
    }

    @Activate
    protected void activate(final HybrisImporterReplicationConfiguration configuration) {
        modified(configuration);
    }

    @Modified
    protected void modified(final HybrisImporterReplicationConfiguration configuration) {
        limit = configuration.limit();
        limitThreshold = configuration.limitThreshold();
    }

    @Reference(cardinality = ReferenceCardinality.MULTIPLE, policy = ReferencePolicy.DYNAMIC)
    protected void bindNotificationService(final HybrisImporterNotificationService service) {
        LOG.debug("adding notification service : {}", service.getClass().getName());

        notificationServices.add(service);
    }

    protected void unbindNotificationService(final HybrisImporterNotificationService service) {
        LOG.debug("removing notification service : {}", service.getClass().getName());

        notificationServices.remove(service);
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
            final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

            for (final HybrisImporterResult result : resultsForContentType) {
                final PageDecorator page = pageManager.getPage(result.getPath());

                // activate only if page is not a language master and was previously activated
                if (!isLanguageMasterPage(page) && isPublished(page)) {
                    LOG.debug("activating result for previous published page : {}", result);

                    replicator.replicate(session, replicationActionType, result.getPath());
                } else {
                    LOG.debug("page was not previously activated for result or is a language master page : {}, " +
                            "ignoring", result);
                }
            }
        }
    }

    private boolean isPublished(final PageDecorator page) {
        final ReplicationStatus replicationStatus = page.adaptTo(ReplicationStatus.class);

        return replicationStatus != null && replicationStatus.getLastPublished() != null;
    }

    private boolean isLanguageMasterPage(final PageDecorator page) {
        return isLanguageMasterPage(page.getPath());
    }

    private boolean isLanguageMasterPage(final String path) {
        return path.startsWith(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS);
    }
}
