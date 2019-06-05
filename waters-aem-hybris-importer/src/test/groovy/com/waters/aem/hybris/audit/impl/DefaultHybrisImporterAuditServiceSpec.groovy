package com.waters.aem.hybris.audit.impl

import com.waters.aem.hybris.AbstractHybrisImporterSpec
import com.waters.aem.hybris.audit.HybrisImporterAuditService
import com.waters.aem.hybris.constants.HybrisImporterConstants
import com.waters.aem.hybris.enums.HybrisImportStatus
import com.waters.aem.hybris.result.HybrisImporterExecutionResult
import com.waters.aem.hybris.result.HybrisImporterResult
import spock.lang.Shared
import spock.lang.Unroll

@Unroll
class DefaultHybrisImporterAuditServiceSpec extends AbstractHybrisImporterSpec {

    @Shared
    HybrisImporterAuditService auditService

    def setup() {
        nodeBuilder.etc {
            waters {
                "hybris-importer" {
                    "jcr:content"()
                }
            }
            commerce {
                products {
                    "176" {
                        "176001744"()
                        "176001836"()
                    }
                }
            }
        }

        auditService = slingContext.registerInjectActivateService(new DefaultHybrisImporterAuditService())
    }

    def "create audit record for result"() {
        setup:
        def results = [
            HybrisImporterResult.fromProduct(
                getNode("/etc/commerce/products/176/176001744"),
                "PFC Analysis Kit",
                HybrisImportStatus.CREATED
            ),
            HybrisImporterResult.fromProduct(
                getNode("/etc/commerce/products/176/176001836"),
                "HPLC Therapeutic Peptide Method Development Kit",
                HybrisImportStatus.UPDATED
            )
        ]

        def result = new HybrisImporterExecutionResult(results, 1)

        when:
        auditService.createAuditRecord(result)

        then: "audit record node is created"
        def date = Calendar.instance
        def auditRecordNodePath = "/etc/waters/hybris-importer/jcr:content/audit/${date.format("yyyy/MM/dd")}/record"

        session.nodeExists(auditRecordNodePath)

        and: "audit record node has properties"
        def auditRecordNode = session.getNode(auditRecordNodePath)

        auditRecordNode.hasProperty(HybrisImporterConstants.PROPERTY_RESULTS)
        auditRecordNode.hasProperty(HybrisImporterConstants.PROPERTY_DURATION)
    }

    def "create audit record for throwable"() {
        setup:
        def throwable = new RuntimeException("hybris import failed")

        when:
        auditService.createAuditRecord(throwable)

        then: "audit record node is created"
        def date = Calendar.instance
        def auditRecordNodePath = "/etc/waters/hybris-importer/jcr:content/audit/${date.format("yyyy/MM/dd")}/record"

        session.nodeExists(auditRecordNodePath)

        and: "audit record node has property"
        def auditRecordNode = session.getNode(auditRecordNodePath)

        auditRecordNode.hasProperty(HybrisImporterConstants.PROPERTY_EXCEPTION_STACK_TRACE)
    }

    def "get audit record for result"() {
        setup:
        def results = [
            HybrisImporterResult.fromProduct(
                getNode("/etc/commerce/products/176/176001744"),
                "PFC Analysis Kit",
                HybrisImportStatus.CREATED
            ),
            HybrisImporterResult.fromProduct(
                getNode("/etc/commerce/products/176/176001836"),
                "HPLC Therapeutic Peptide Method Development Kit",
                HybrisImportStatus.UPDATED
            )
        ]

        def result = new HybrisImporterExecutionResult(results, 1)

        when: "create audit record"
        auditService.createAuditRecord(result)

        then: "audit record exists"
        def date = Calendar.instance
        def auditRecordNodePath = "/etc/waters/hybris-importer/jcr:content/audit/${date.format("yyyy/MM/dd")}/record"

        def auditRecord = auditService.getAuditRecord(auditRecordNodePath)

        assert auditRecord

        then: "audit record has values"
        auditRecord.path == auditRecordNodePath
        auditRecord.date
        auditRecord.duration == 1
        !auditRecord.exceptionStackTrace
        auditRecord.results == results
        auditRecord.statusCounts == [MOVED: 0L, CREATED: 1L, UPDATED: 1L, DELETED: 0L, IGNORED: 0L]
    }

    def "get audit record for throwable"() {
        setup:
        def throwable = new RuntimeException()

        when: "create audit record"
        auditService.createAuditRecord(throwable)

        then: "audit record exists"
        def date = Calendar.instance
        def auditRecordNodePath = "/etc/waters/hybris-importer/jcr:content/audit/${date.format("yyyy/MM/dd")}/record"

        def auditRecord = auditService.getAuditRecord(auditRecordNodePath)

        assert auditRecord

        then: "audit record has values"
        auditRecord.path == auditRecordNodePath
        auditRecord.date
        !auditRecord.duration
        !auditRecord.results
        auditRecord.exceptionStackTrace
        auditRecord.statusCounts == [MOVED: 0L, CREATED: 0L, UPDATED: 0L, DELETED: 0L, IGNORED: 0L]
    }

    def "get audit records"() {
        setup: "create multiple audit records"
        def throwable = new RuntimeException()

        (0..1).each {
            auditService.createAuditRecord(throwable)
        }

        def auditRecords = auditService.auditRecords

        expect: "2 audit records are returned"
        auditRecords.size() == 2

        and: "audit records are sorted in ascending date order"
        auditRecords[0].date.before(auditRecords[1].date)
    }
}
