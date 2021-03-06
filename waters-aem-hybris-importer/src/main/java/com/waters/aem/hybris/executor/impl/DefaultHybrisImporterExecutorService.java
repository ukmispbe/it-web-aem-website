package com.waters.aem.hybris.executor.impl;

import com.google.common.base.Stopwatch;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.executor.HybrisImporterExecutorService;
import com.waters.aem.hybris.executor.options.HybrisImporterOptions;
import com.waters.aem.hybris.importer.HybrisCatalogImporter;
import com.waters.aem.hybris.importer.HybrisProductImporter;
import com.waters.aem.hybris.notification.HybrisImporterNotificationService;
import com.waters.aem.hybris.replication.HybrisImporterReplicationService;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Component(service = HybrisImporterExecutorService.class)
public final class DefaultHybrisImporterExecutorService implements HybrisImporterExecutorService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisImporterExecutorService.class);

    @Reference
    private HybrisCatalogImporter hybrisCatalogImporter;

    @Reference
    private HybrisProductImporter hybrisProductImporter;

    @Reference
    private HybrisImporterAuditService auditService;

    @Reference
    private HybrisImporterReplicationService replicationService;

    private volatile List<HybrisImporterNotificationService> notificationServices = new CopyOnWriteArrayList<>();

    /** Single-thread executor for asynchronous import will block to ensure only one import process runs at a time. **/
    private ListeningExecutorService executorService;

    /** Current execution result. Single-valued since executor is limited to a single thread. **/
    private ListenableFuture<HybrisImporterExecutionResult> result;

    @Override
    public ListenableFuture<HybrisImporterExecutionResult> execute(final HybrisImporterOptions options) {
        result = executorService.submit(() -> {
            final Stopwatch stopwatch = Stopwatch.createStarted();

            LOG.info("starting hybris import with options : {}", options);

            final List<HybrisImporterResult> results = new ArrayList<>();

            // import products first
            if (options.getProductCodes().isEmpty()) {
                results.addAll(hybrisProductImporter.importProducts(options.isForce()));
            } else {
                results.addAll(hybrisProductImporter.importProducts(options.getProductCodes()));
            }

            // import categories (product pages will be created for each category based on the result of the preceding
            // product import)
            results.addAll(hybrisCatalogImporter.importCatalogPages());

            final long duration = stopwatch.elapsed(TimeUnit.SECONDS);

            LOG.info("imported {} items in {}s", results.size(), duration);

            for (final HybrisImportStatus status : HybrisImportStatus.values()) {
                LOG.info("import status : {}, total items : {}", status.name(),
                    results.stream().filter(result -> result.getStatus() == status).count());
            }

            if (options.isReplicate()) {
                replicationService.replicate(results, false);
            }

            return new HybrisImporterExecutionResult(results, duration);
        });

        Futures.addCallback(result, new FutureCallback<HybrisImporterExecutionResult>() {
            @Override
            public void onSuccess(final HybrisImporterExecutionResult result) {
                LOG.info("import success, creating audit record...");

                auditService.createAuditRecord(result);
                notificationServices.forEach(notificationService -> notificationService.notify(result));
            }

            @Override
            public void onFailure(final @Nonnull Throwable throwable) {
                LOG.error("import failure, creating audit record...", throwable);

                auditService.createAuditRecord(throwable);
                notificationServices.forEach(notificationService -> notificationService.notify(throwable));
            }
        }, executorService);

        return result;
    }

    @Override
    public ListenableFuture<HybrisImporterExecutionResult> getResult() {
        return result;
    }

    @Override
    public Boolean isRunning() {
        return result != null && !result.isDone();
    }

    @Activate
    protected void activate() {
        executorService = MoreExecutors.listeningDecorator(Executors.newSingleThreadExecutor());
    }

    @Deactivate
    protected void deactivate() {
        // ensure executor service is shutdown before allowing deactivation of the service
        executorService.shutdown();
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
}
