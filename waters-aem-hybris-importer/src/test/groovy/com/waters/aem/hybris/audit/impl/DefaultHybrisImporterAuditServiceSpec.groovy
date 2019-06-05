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

    def setupSpec() {
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

        def date = Calendar.instance

        when:
        auditService.createAuditRecord(result)

        then: "audit record node is created"
        def year = date.format("yyyy")
        def month = date.format("MM")
        def day = date.format("dd")

        def auditRecordNodePath = "/etc/waters/hybris-importer/jcr:content/audit/$year/$month/$day/record"

        session.nodeExists(auditRecordNodePath)

        and: "audit record node has properties"
        def auditRecordNode = session.getNode(auditRecordNodePath)

        auditRecordNode.hasProperty(HybrisImporterConstants.PROPERTY_RESULTS)
        auditRecordNode.hasProperty(HybrisImporterConstants.PROPERTY_DURATION)
    }

    def "create audit record for throwable"() {
        setup:
        def throwable = new RuntimeException("hybris import failed")
        def date = Calendar.instance

        when:
        auditService.createAuditRecord(throwable)

        then: "audit record node is created"
        def year = date.format("yyyy")
        def month = date.format("MM")
        def day = date.format("dd")

        def auditRecordNodePath = "/etc/waters/hybris-importer/jcr:content/audit/$year/$month/$day/record"

        session.nodeExists(auditRecordNodePath)

        and: "audit record node has property"
        def auditRecordNode = session.getNode(auditRecordNodePath)

        auditRecordNode.hasProperty(HybrisImporterConstants.PROPERTY_EXCEPTION_STACK_TRACE)
    }
}
