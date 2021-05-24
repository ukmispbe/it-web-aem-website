def sites = ["us"] // "at", "de","ch", "au","ca", "be","cz","dk","ee","fi","gb","hk","id","ie","in","is","lt","lv","my","nl","no","nz","ph","pl","sg","se","th","us","xg","hu","vn","pr","be","fr","ca","ch","xg", "br","pt", "cn", "tw", "jp","mx","es","xg","it","kr","us"

sites.each { site ->
    try {
        def page = getPage("/content/waters/${site}")
        def node = page.node
        if(node && (node.hasProperty("quoteDisabled") || node.hasProperty("checkoutDisabled"))) {
            if (node.hasProperty("quoteDisabled")) {
                node.setProperty("quoteDisabled", true);
            } 
            if (node.hasProperty("checkoutDisabled")) {
                node.setProperty("checkoutDisabled", true);
            }
            session.save()
            activate(node.path)
            println "Path: "+node.path
        }
    } catch (Exception e) {
        println "Exception Occurred while fetching path" + e
    }
}