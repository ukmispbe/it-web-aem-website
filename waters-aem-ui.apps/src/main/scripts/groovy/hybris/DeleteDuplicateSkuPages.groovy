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
                pageManager.delete(page, false, false)
            }
        }
    }

    save()

    println "\nDeleted pages on author ($deletedAuthorPages.size): "
    deletedAuthorPages.each { println it }
    println ""
}
