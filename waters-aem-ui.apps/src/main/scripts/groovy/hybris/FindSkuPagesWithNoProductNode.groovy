import com.day.cq.replication.ReplicationActionType
import com.day.cq.replication.Replicator
import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.utils.Templates

def dryRun = true

def basePaths = [
        "/content/waters/us/en/shop",
//        "/content/waters/ee/en/shop",
//        "/content/waters/pr/en/shop",
//        "/content/waters/fi/en/shop",
//        "/content/waters/in/en/shop",
//        "/content/waters/nz/en/shop",
//        "/content/waters/se/en/shop",
//        "/content/waters/au/en/shop",
//        "/content/waters/pl/en/shop",
//        "/content/waters/ie/en/shop",
//        "/content/waters/cz/en/shop",
//        "/content/waters/my/en/shop",
//        "/content/waters/th/en/shop",
//        "/content/waters/is/en/shop",
//        "/content/waters/no/en/shop",
//        "/content/waters/lt/en/shop",
//        "/content/waters/ph/en/shop",
//        "/content/waters/sg/en/shop",
//        "/content/waters/id/en/shop",
//        "/content/waters/hk/en/shop",
//        "/content/waters/lv/en/shop",
//        "/content/waters/dk/en/shop",
//        "/content/waters/ca/en/shop",
//        "/content/waters/nl/en/shop",
//        "/content/waters/hu/en/shop",
//        "/content/waters/gb/en/shop",
//        "/content/waters/vn/en/shop",
//        "/content/waters/xg/en/shop",
//        "/content/waters/cn/zh/shop",
//        "/content/waters/tw/zh/shop",
//        "/content/waters/jp/ja/shop",
//        "/content/waters/kr/ko/shop",
//        "/content/waters/ch/fr/shop",
//        "/content/waters/be/fr/shop",
//        "/content/waters/xg/fr/shop",
//        "/content/waters/ca/fr/shop",
//        "/content/waters/fr/fr/shop",
//        "/content/waters/at/de/shop",
//        "/content/waters/de/de/shop",
//        "/content/waters/ch/de/shop",
//        "/content/waters/it/it/shop",
//        "/content/waters/mx/es/shop",
//        "/content/waters/es/es/shop",
//        "/content/waters/xg/es/shop",
//        "/content/waters/pt/pt/shop",
//        "/content/waters/br/pt/shop",
].each { basePath ->

    def pagesWithNoProduct = []

    getPage(basePath).recurse { p ->
        def page = p.adaptTo(PageDecorator)

        if (Templates.isSkuPage(page)) {
            def productResourcePath = page.get("hybris:productResourcePath")

            if (productResourcePath) {
                def productResource = getResource(productResourcePath)

                if (productResource == null) {
                    pagesWithNoProduct.add(page.path)
                }
            }
        }
    }

    println "($pagesWithNoProduct.size) Pages with no product node under $basePath"
    pagesWithNoProduct.each { println it }
    println ""

    if (!dryRun) {
        replicatePaths(pagesWithNoProduct)
    }
}

def replicatePaths(paths) {
    def deletedAuthorPages = []
    def repl = getService(Replicator)
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