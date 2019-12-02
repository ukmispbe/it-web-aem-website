import com.day.cq.commons.LanguageUtil
import com.icfolson.aem.library.api.page.PageDecorator
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate
import com.waters.aem.core.utils.Templates
import org.apache.commons.lang.StringUtils
import org.apache.sling.api.resource.ModifiableValueMap

def fragmentUpdateCount = 0

def basePaths = [
    "/content/waters/xg/fr/shop",
    "/content/waters/xg/es/shop",
    "/content/waters/ca/fr/shop",
    "/content/waters/at/de/shop",
    //"/content/waters/be/fr/shop",
    //"/content/waters/cn/zh/shop",
    //"/content/waters/fr/fr/shop",
    //"/content/waters/de/de/shop",
    //"/content/waters/it/it/shop",
    //"/content/waters/jp/ja/shop",
    //"/content/waters/mx/es/shop",
    //"/content/waters/kr/ko/shop",
    //"/content/waters/es/es/shop",
    //"/content/waters/ch/fr/shop",
    //"/content/waters/ch/de/shop",

    // Special paths that require a unique language code
    //"/content/waters/br/pt/shop", // pt_br
    //"/content/waters/tw/zh/shop", // zh_tw
    //"/content/waters/pt/pt/shop"  // pt_br
].each { basePath ->
    def langRoot = LanguageUtil.getLanguageRoot(basePath)

    // This is the lang code that replaces the original XF lang code.
    // For XFs that don't follow the same lang code convention (e.g. "pt/pt" pages using "pt/pt_br" XFs, you can just hardcode the "pt_br" lang code here
    def langCode = StringUtils.substringAfterLast(langRoot, "/")

    getPage(basePath).recurse { p ->
        def page = p.adaptTo(PageDecorator)

        if (Templates.isSkuPage(page)) {
            if (page.componentNode.isPresent()) {
                def xfComponents = page.componentNode.get().findDescendants(
                        new ComponentNodeResourceTypePredicate("cq/experience-fragments/editor/components/experiencefragment"))

                xfComponents.each { xf ->
                    def fragmentPathOptional = xf.get("fragmentPath", String)

                    if (fragmentPathOptional.isPresent()) {
                        def fragmentPath = fragmentPathOptional.get()
                        def fragmentLangRoot = LanguageUtil.getLanguageRoot(fragmentPath)
                        def fragmentLang = StringUtils.substringAfterLast(fragmentLangRoot, "/")

                        // if fragmentPath has a language root, replace it with the basePath's language code
                        if (fragmentLangRoot) {
                            fragmentUpdateCount++

                            // println "updating $xf.resource.path with " + fragmentPath.replace("/$fragmentLang/", "/$langCode/")

                            xf.resource.adaptTo(ModifiableValueMap)
                                    .put("fragmentPath", fragmentPath.replace("/$fragmentLang/", "/$langCode/"))
                        }
                    }

                    if (fragmentUpdateCount > 0 && fragmentUpdateCount % 200 == 0) {
                        // println "Committing JCR changes to Session after 100 changes..."
                        save()
                    }
                }
            }
        }
    }

    save()
}

println "Updated $fragmentUpdateCount fragments across base paths $basePaths"
