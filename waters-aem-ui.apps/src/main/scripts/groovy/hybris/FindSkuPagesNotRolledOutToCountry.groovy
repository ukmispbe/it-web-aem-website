/**
 * Iterates through language master pages and looks for an equivalent live copy page at the provided root path.
 */
import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.utils.Templates

def languageMasterRoot = "/content/waters/language-masters/en/shop"

// change this value to the country you want to check for the existence of live copies
def liveCopyRoot = "/content/waters/cn/zh/shop"

def pagesNotRolledOut = []

getPage(languageMasterRoot).recurse { p ->
    def page = p.adaptTo(PageDecorator)

    if (Templates.isSkuPage(page)) {
        def liveCopyPage = getPage(p.path.replace(languageMasterRoot, liveCopyRoot))

        if (!liveCopyPage) {
            pagesNotRolledOut.add(p.path)
        }
    }
}

println "($pagesNotRolledOut.size) pages not yet rolled out to $liveCopyRoot"
pagesNotRolledOut.each { println it }
