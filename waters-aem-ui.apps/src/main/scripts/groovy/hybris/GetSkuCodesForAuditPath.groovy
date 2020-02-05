/**
 * For a given audit record path, print the list of SKU codes created or updated during that import.
 */

import com.waters.aem.hybris.audit.HybrisImporterAuditService
import com.waters.aem.hybris.enums.HybrisImportContentType


def auditService = getService(HybrisImporterAuditService)

def auditPath = "/etc/waters/hybris-importer/jcr:content/audit/2020/02/04/record0"

def skus = []

auditService.getAuditRecord(auditPath).results.findAll {
    it.contentType == HybrisImportContentType.PRODUCT
}.each {
    def skuPath = it.path
    skus.add(skuPath.substring(skuPath.lastIndexOf("/") + 1, skuPath.size()))
}

skus.each { println it }
