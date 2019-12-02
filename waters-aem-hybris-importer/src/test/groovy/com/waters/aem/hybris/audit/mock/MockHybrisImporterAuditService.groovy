package com.waters.aem.hybris.audit.mock


import com.waters.aem.hybris.audit.HybrisImporterAuditRecord
import com.waters.aem.hybris.audit.HybrisImporterAuditService
import com.waters.aem.hybris.result.HybrisImporterExecutionResult
import groovy.util.logging.Slf4j

@Slf4j("LOG")
class MockHybrisImporterAuditService implements HybrisImporterAuditService {

    @Override
    void createAuditRecord(HybrisImporterExecutionResult result) {
        throw new UnsupportedOperationException()
    }

    @Override
    void createAuditRecord(Throwable throwable) {
        throw new UnsupportedOperationException()
    }

    @Override
    HybrisImporterAuditRecord getAuditRecord(String path) {
        throw new UnsupportedOperationException()
    }

    @Override
    List<HybrisImporterAuditRecord> getAuditRecords() {
        throw new UnsupportedOperationException()
    }

    @Override
    void setLastRequestedProductDelta(Calendar timestamp) {
        // do nothing
    }

    @Override
    Calendar getLastRequestedProductDelta() {
        return null
    }
}
