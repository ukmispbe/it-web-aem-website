import com.icfolson.aem.library.api.page.PageDecorator
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate
import com.day.cq.commons.LanguageUtil
import org.apache.sling.api.resource.ModifiableValueMap

def basePath = "/content/waters/xg/es/shop"

def langRoot = LanguageUtil.getLanguageRoot(basePath)

def pageUpdateCount = 0

getPage(basePath).recurse { p ->

    def page = p.adaptTo(PageDecorator)

    def compNodeOptional = page.componentNode

    if (compNodeOptional.isPresent()) {
        def navComponents = compNodeOptional.get().findDescendants(new ComponentNodeResourceTypePredicate("waters/components/content/navigation"))

        if (navComponents.size() > 0) {
            def nav = navComponents[0]

            def navigationRootOptional = nav.get("navigationRoot", String)

            if (navigationRootOptional.isPresent()) {
                def navigationLangRoot = LanguageUtil.getLanguageRoot(navigationRootOptional.get())

                if (navigationLangRoot != langRoot) {
                    println "Updating navRoot on $page.path with navRoot $langRoot"

                    pageUpdateCount++

                    nav.resource.adaptTo(ModifiableValueMap).put("navigationRoot", langRoot)
                }
            }

            if (pageUpdateCount > 0 && pageUpdateCount % 100 == 0) {
                println "Committing JCR changes to Session after 100 changes..."
                save()
            }
        }
    }
}

save()
