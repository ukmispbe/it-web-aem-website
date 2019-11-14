import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.utils.Templates

def basePath = "/content/waters"

def basePage = getPage(basePath).adaptTo(PageDecorator)

basePage.recurse { p ->

    def page = p.adaptTo(PageDecorator)

    println page.path

    if (Templates.isSkuPage(page)) {

        def contentNode = page.contentResource.adaptTo(Node)

        if (contentNode.hasProperty('sling:vanityPath')) {

            println 'Deleting vanity path for page: ' + page.path

            contentNode.getProperty('sling:vanityPath').remove()
        }
    }
}

session.save()
