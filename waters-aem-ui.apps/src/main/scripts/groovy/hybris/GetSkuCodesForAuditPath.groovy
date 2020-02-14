/**
 * For a given audit record path, print the list of SKU codes created or updated during that import.
 */

import com.waters.aem.hybris.audit.HybrisImporterAuditService
import com.waters.aem.hybris.enums.HybrisImportContentType


def auditService = getService(HybrisImporterAuditService)

def auditPath = "/etc/waters/hybris-importer/jcr:content/audit/2020/02/04/record0"

def skus = [] as Set
def duplicates = []

auditService.getAuditRecord(auditPath).results.findAll {
    it.contentType == HybrisImportContentType.PRODUCT
}.each {
    def skuPath = it.path
    def skuCode = skuPath.substring(skuPath.lastIndexOf("/") + 1, skuPath.size())

    boolean unique = skus.add(skuCode)

    if (!unique) {
        duplicates.add(skuCode)
    }
}

println "Imported SKUs"
println "-------------"
skus.each { println it }

// print duplicated SKUs from the import if any exist
if (duplicates.size() > 0) {
    println ""
    println "Duplicated SKU codes in import"
    println "------------------------------"
    duplicates.each { println it }
}
