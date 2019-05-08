package com.waters.aem.hybris.audit;

import com.waters.aem.hybris.result.HybrisImporterExecutionResult;

import java.util.Calendar;
import java.util.List;

public interface HybrisImporterAuditService {

    void createAuditRecord(HybrisImporterExecutionResult result);

    void createAuditRecord(Throwable throwable);

    HybrisImporterAuditRecord getAuditRecord(String path);

    List<HybrisImporterAuditRecord> getAuditRecords();

    List<HybrisImporterAuditRecord> getAuditRecords(Calendar startDate, Calendar endDate);
}
