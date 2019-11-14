import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.utils.Templates

def basePath = "/content/waters/be/en/shop"

def dryRun = true

def skuPageCount = 0
def basePage = getPage(basePath).adaptTo(PageDecorator)

basePage.recurse { p ->

    def page = p.adaptTo(PageDecorator)

    if (Templates.isSkuPage(page)) {
        def contentNode = page.contentResource.adaptTo(Node)

        if (contentNode.hasProperty('sling:vanityPath')) {

            println 'Deleting vanity path for page: ' + page.path

            skuPageCount++

            contentNode.getProperty('sling:vanityPath').remove()
        }
    }

    if (skuPageCount > 0 && skuPageCount % 100 == 0) {
        if (!dryRun) {
            println "Committing JCR changes to Session after 100 changes..."
            save()
        }
    }
}

if (!dryRun) {
    save()
}

println "Total SKU pages updated: $skuPageCount"