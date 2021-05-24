def sites = ["us"] // "at", "de","ch", "au","ca", "be","cz","dk","ee","fi","gb","hk","id","ie","in","is","lt","lv","my","nl","no","nz","ph","pl","sg","se","th","us","xg","hu","vn","pr","be","fr","ca","ch","xg", "br","pt", "cn", "tw", "jp","mx","es","xg","it","kr","us"
count = 0
sites.each { site ->
    try {
        def nodePath = "/content/waters/${site}"
        getPage("/content/waters/${site}").recurse {page ->
            def content = page.node
            if(content && (content.hasProperty("quoteDisabled") || content.hasProperty("checkoutDisabled"))) {
                if (content.hasProperty("quoteDisabled")) {
                    content.set("quoteDisabled", false);
                } 
                if (content.hasProperty("checkoutDisabled")) {
                    content.set("checkoutDisabled", false);
                }
                session.save()
                activate(content.path)
            }
        }
    } catch (Exception e) {
        println "Exception Occurred while fetching path" + e
    }
}