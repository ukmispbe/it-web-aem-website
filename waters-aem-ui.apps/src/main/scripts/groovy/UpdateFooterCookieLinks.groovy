def resourcePathsToRemove = []

getPage("/content/waters").recurse { page ->
    def footer = page.getContentResource("footer")

    if (footer) {
        def footerLinks = footer.getChild("footerLinks")

        if (footerLinks) {
            footerLinks.children.eachWithIndex { footerLink, i ->
                if (footerLink.valueMap.get("text", "") == "Cookies") {
                    resourcePathsToRemove.add(footerLink.path)

                    def link = footerLink.valueMap.get("link", "")

                    footer.adaptTo(Node).setProperty("cookiesLink", link)
                }
            }
        }
    }
}

resourcePathsToRemove.each {
    getNode(it).remove()
}

save()