package com.waters.aem.hybris.executor.impl;

import com.google.common.base.Stopwatch;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.executor.HybrisCatalogImporterExecutor;
import com.waters.aem.hybris.importer.HybrisCatalogImporter;
import com.waters.aem.hybris.notification.HybrisImporterNotificationService;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Component(service = HybrisCatalogImporterExecutor.class)
public final class DefaultHybrisCatalogImporterExecutor implements HybrisCatalogImporterExecutor {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisCatalogImporterExecutor.class);

    @Reference
    private HybrisCatalogImporter hybrisCatalogImporter;

    @Reference
    private HybrisImporterAuditService auditService;

    @Reference
    private HybrisImporterNotificationService notificationService;

    /** Single-thread executor for asynchronous import will block to ensure only one import process runs at a time. **/
    private ListeningExecutorService executorService;

    /** Current execution result. Single-valued since executor is limited to a single thread. **/
    private ListenableFuture<HybrisImporterExecutionResult> result;

    @Override
    public ListenableFuture<HybrisImporterExecutionResult> executeCatalogImport() {
        result = executorService.submit(() -> {
            final Stopwatch stopwatch = Stopwatch.createStarted();

            final List<HybrisImporterResult> results = hybrisCatalogImporter.importCatalogPages();

            final long duration = stopwatch.elapsed(TimeUnit.SECONDS);

            LOG.info("imported {} pages in {}s", results.size(), duration);

            for (final HybrisImportStatus status : HybrisImportStatus.values()) {
                LOG.info("import status : {}, total pages : {}", status.name(),
                    results.stream().filter(result -> result.getStatus() == status).count());
            }

            return new HybrisImporterExecutionResult(results, duration);
        });

        Futures.addCallback(result, new FutureCallback<HybrisImporterExecutionResult>() {
            @Override
            public void onSuccess(final HybrisImporterExecutionResult result) {
                LOG.info("import success, creating audit record...");

                auditService.createAuditRecord(result);
                notificationService.notify(result);
            }

            @Override
            public void onFailure(@Nonnull Throwable throwable) {
                LOG.error("import failure, creating audit record...", throwable);

                auditService.createAuditRecord(throwable);
                notificationService.notify(throwable);
            }
        }, executorService);

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
}
