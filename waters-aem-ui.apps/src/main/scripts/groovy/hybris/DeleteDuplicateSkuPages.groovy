import com.waters.aem.core.commerce.services.SkuRepository
import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.utils.Templates
import com.day.cq.replication.Replicator
import com.day.cq.replication.ReplicationActionType

// base path to operate on sku pages
def basePath = "/content/waters/be/en/shop"

def pagesToDelete = []

def skuPagesPerSkuCode = findSkuPagesPerSku(basePath, pagesToDelete)

pagesToDelete.addAll(getDuplicateSkuPagesPerSkuCode(skuPagesPerSkuCode))

println "\nPages to delete ($pagesToDelete.size): "
pagesToDelete.each { println it }
println ""

// this replicates on paths to delete
replicatePaths(pagesToDelete)

/**
 * This method creates a map of AEM page paths per sku code
 *
 * ex: { "wat123456" : ["/content/waters/us/en/shop/category-1/sku123456", "/content/waters/us/en/shop/category-2/sku123456"] }
 *
 * @param basePath - base country path to iterate over
 * @param pagesToDelete - if any sku pages exist for a non-existent product resource, delete this page as well (uncommon scenario)
 * @return map of AEM page paths per sku code
 */
def findSkuPagesPerSku(basePath, pagesToDelete) {
    def skuMap = [:]
    def repo = getService(SkuRepository)
    def basePage = getPage(basePath).adaptTo(PageDecorator)

    basePage.recurse { p ->
        def page = p.adaptTo(PageDecorator)

        if (Templates.isSkuPage(page)) {
            def skuResource = getResource(page.contentResource.valueMap.get("hybris:productResourcePath"))

            if (skuResource) {
                def sku = repo.getSku(page)

                if (sku) {
                    def skuPagesForCode = skuMap.get(sku.code)

                    if (skuPagesForCode != null) {
                        skuPagesForCode.add(page.path)
                    } else {
                        skuMap.put(sku.code, [page.path])
                    }
                }
            } else {
                println "Page missing associated SKU: $page.path"
                pagesToDelete.add(page.path)
            }
        }
    }

    return skuMap
}

/**
 * Given a map of AEM pages per sku code provided by findSkuPagesPerSku(), find SKU page duplicates by looking at
 * all entries that have more than 1 page for a sku code.
 *
 * For a set of duplicate SKU pages for a single SKU, compare the page timestamp via the "jcr:created" property to
 * determine which SKU page is older, thus should be deleted.
 *
 * @param skuPagesPerSkuCode
 * @return a list of old pages that can be deleted
 */
def getDuplicateSkuPagesPerSkuCode(skuPagesPerSkuCode) {
    // populate map with SKUs that have duplicate AEM pages
    def duplicateSkuMap = [:]
    def pagesToDelete = []

    skuPagesPerSkuCode.each { skuCode, pages ->
        if (pages.size > 1) {
            duplicateSkuMap.put(skuCode, pages)
        }
    }

    duplicateSkuMap.each { skuCode, pagePaths ->
        // sort by newest date first, add rest to pages to delete
        pagePaths.sort {
            getPage(it).contentResource.valueMap.get("jcr:created", Calendar)
        }

        pagesToDelete.addAll(pagePaths[0..pagePaths.size - 2])
    }

    return pagesToDelete
}

/**
 * Deletes the AEM pages provided by the list of paths.
 * This sends a DELETE replication event and then deletes from author as well.
 *
 * @param paths - paths to replicate (delete)
 */
def replicatePaths(paths) {
    def deletedAuthorPages = []
    def repl = getService(Replicator)
    // def replType = ReplicationActionType.ACTIVATE
    def replType = ReplicationActionType.DELETE

    paths.each { path ->
        println "Replication action $replType for path $path"
        repl.replicate(session, replType, path)

        if (replType == ReplicationActionType.DELETE) {
            def page = getPage(path)
            if (page) {
                deletedAuthorPages.add(page.path)
                getNode(page.path).remove()
            }
        }
    }

    save()

    println "\nDeleted pages on author ($deletedAuthorPages.size): "
    deletedAuthorPages.each { println it }
    println ""
}
