package com.waters.aem.hybris.components;

import com.google.common.collect.Iterables;
import com.waters.aem.hybris.audit.HybrisImporterAuditRecord;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.executor.HybrisImporterExecutorService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.List;

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
        return lastAuditRecord.getExceptionStackTrace().isEmpty();
    }

    public Boolean isRunning() {
        return executorService.isRunning();
    }
}
