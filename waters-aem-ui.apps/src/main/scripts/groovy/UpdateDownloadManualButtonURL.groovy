// This groovy script only for LOWER ENV [dev | stage]
final def page = getPage('/content/waters/us/en')
final def resourceType = 'waters/components/content/applicationnotes/sectioncontainer'
final def query = buildQuery(page,resourceType)
final def result = query.execute()

def buildQuery(page,resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    node.findAll { it.hasNodes() }.each {
        if(it.name.contains("par")) {
            def tileNodes = getNodes(it, "tiles")
            if(tileNodes && tileNodes.getNodes().size()) {
                tileNodes.each { tiles ->
                    if(tiles.getNodes().size()) {
                        tiles.each{item ->
                            def link = getLink(item, "/icons/manual.svg")
                            if(link){
                                item.setProperty("link", link)
                                session.save()
                                activate(item.path);
                                println "Updated link: " +link
                                println "Item path :" +item.path
                            }
                        }
                    }
                }
            }
        }
    }
}

def isNodeExist(nodes, node) {
    return nodes.getNodes().size() && nodes.hasNode(node)
}

def getNodes(nodes, node) {
    return nodes.getNodes().size() && nodes.hasNode(node) ? nodes.getNode(node) : null
}

def getLink(node, condition) {
    def link = ""
    if(node.hasProperty("icon") && node.hasProperty("link") && node.getProperty("icon").string.contains(condition)) {
        link = node.getProperty("link").string
        if(link) {
            link = link.replace("www.", "wwwdt1.");
        }
    }
    return link

}
