package com.waters.aem.hybris.components;

import com.google.common.collect.Iterables;
import com.google.common.util.concurrent.ListenableFuture;
import com.waters.aem.hybris.audit.HybrisImporterAuditRecord;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.executor.HybrisImporterExecutorService;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Model(adaptables = Resource.class)
public final class HybrisImporterStatus {

    private static final String DATE_FORMAT = "EEEE, MMMM d yyyy 'at' HH:mm:ss a z";

    @Inject
    private HybrisImporterAuditService auditService;

    @Inject
    private HybrisImporterExecutorService executorService;

    private HybrisImporterAuditRecord lastAuditRecord;

    @PostConstruct
    void init() {
        final List<HybrisImporterAuditRecord> auditRecords = auditService.getAuditRecords();

        if (!auditRecords.isEmpty()) {
            lastAuditRecord = Iterables.getLast(auditRecords);
        }
    }

    public String getLastImportDate() {
        return lastAuditRecord == null ? null : new SimpleDateFormat(DATE_FORMAT).format(
            lastAuditRecord.getDate().getTime());
    }

    public boolean isSuccess() {
        boolean success = true;

        final ListenableFuture<HybrisImporterExecutionResult> result = executorService.getResult();

        if (result == null) {
            success = false;
        } else {
            try {
                result.get();
            } catch (ExecutionException | InterruptedException e) {
                success = false;
            }
        }

        return success;
    }

    public Boolean isRunning() {
        return executorService.isRunning();
    }
}
