package com.waters.aem.hybris.audit;

import com.waters.aem.hybris.result.HybrisImporterExecutionResult;

import java.util.List;

/**
 * Audit service for Hybris Importer.
 */
public interface HybrisImporterAuditService {

    /**
     * Create an audit record for a successful import.
     *
     * @param result importer execution result
     */
    void createAuditRecord(HybrisImporterExecutionResult result);

    /**
     * Create an audit record for a failed import.
     *
     * @param throwable cause of importer failure
     */
    void createAuditRecord(Throwable throwable);

    /**
     * Get the audit record for the given resource path.
     *
     * @return audit record or null if not found
     */
    HybrisImporterAuditRecord getAuditRecord(String path);

    /**
     * Get all audit records.
     *
     * @return list of audit records sorted by date (ascending)
     */
    List<HybrisImporterAuditRecord> getAuditRecords();
}
