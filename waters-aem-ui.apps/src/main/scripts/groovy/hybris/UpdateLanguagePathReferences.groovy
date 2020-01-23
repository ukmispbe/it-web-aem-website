import com.icfolson.aem.library.api.page.PageDecorator
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate
import com.day.cq.commons.LanguageUtil
import org.apache.sling.api.resource.ModifiableValueMap

def basePaths = [
        "/content/waters/cn/zh/shop",
        "/content/waters/tw/zh/shop",
        "/content/waters/jp/ja/shop",
        "/content/waters/kr/ko/shop",
        "/content/waters/ch/fr/shop",
        "/content/waters/be/fr/shop",
        "/content/waters/xg/fr/shop",
        "/content/waters/ca/fr/shop",
        "/content/waters/fr/fr/shop",
        "/content/waters/at/de/shop",
        "/content/waters/de/de/shop",
        "/content/waters/ch/de/shop",
        "/content/waters/it/it/shop",
        "/content/waters/mx/es/shop",
        "/content/waters/es/es/shop",
        "/content/waters/xg/es/shop",
        "/content/waters/pt/pt/shop",
        "/content/waters/br/pt/shop"
]

basePaths.each { basePath ->
    def langRoot = LanguageUtil.getLanguageRoot(basePath)

    getPage(basePath).recurse { p ->

        def page = p.adaptTo(PageDecorator)

        def compNodeOptional = page.componentNode

        if (compNodeOptional.isPresent()) {
            def navComponents = compNodeOptional.get().findDescendants(new ComponentNodeResourceTypePredicate("waters/components/content/navigation"))
            def footerComponents = compNodeOptional.get().findDescendants(new ComponentNodeResourceTypePredicate("waters/components/structure/footer"))
            def headerComponents = compNodeOptional.get().findDescendants(new ComponentNodeResourceTypePredicate("waters/components/structure/header"))

            updateNavPath(navComponents, langRoot)
            updateFooterLogoPath(footerComponents, langRoot)
            updateHeaderPaths(headerComponents, langRoot)
        }
    }

    save()
}

def updateNavPath(navComponents, langRoot) {
    if (navComponents.size() > 0) {
        def nav = navComponents[0]

        def navigationRootOptional = nav.get("navigationRoot", String)

        if (navigationRootOptional.isPresent()) {
            def navigationLangRoot = LanguageUtil.getLanguageRoot(navigationRootOptional.get())

            if (navigationLangRoot != langRoot) {
//                println "Updating navRoot on $nav.path with navRoot $langRoot"
                nav.resource.adaptTo(ModifiableValueMap).put("navigationRoot", langRoot)
            }
        }
    }
}

def updateHeaderPaths(headerComponents, langRoot) {
    if (headerComponents.size() > 0) {
        def header = headerComponents[0]

        def logoLinkOptional = header.get("logoLink", String)
        def searchPathOptional = header.get("searchPath", String)

        if (logoLinkOptional.isPresent()) {
            def logoLink = LanguageUtil.getLanguageRoot(logoLinkOptional.get())

            if (logoLink != langRoot) {
//                println "Updating logoLink on $header.path with logoLink $langRoot"
                header.resource.adaptTo(ModifiableValueMap).put("logoLink", langRoot)
            }
        }

        if (searchPathOptional.isPresent()) {
            def searchPath = LanguageUtil.getLanguageRoot(searchPathOptional.get())

            if (searchPath != langRoot) {
                def newSearchPath = langRoot + "/search"
//                println "Updating searchPath on $header.path with searchPath $newSearchPath"
                header.resource.adaptTo(ModifiableValueMap).put("searchPath", newSearchPath)
            }
        }
    }
}

def updateFooterLogoPath(footerComponents, langRoot) {
    if (footerComponents.size() > 0) {
        def footer = footerComponents[0]

        def logoLinkOptional = footer.get("logoLink", String)

        if (logoLinkOptional.isPresent()) {
            def logoLink = LanguageUtil.getLanguageRoot(logoLinkOptional.get())

            if (logoLink != langRoot) {
//                println "Updating logoLink on $footer.path with logoLink $langRoot"
                footer.resource.adaptTo(ModifiableValueMap).put("logoLink", langRoot)
            }
        }
    }
}