final def page = getPage('/content/waters/language-masters/en/application-notes')
final def resourceType= 'waters/components/structure/header'
final def initialIndex = '0'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    def linkItemsNode = null

    if(node.hasNode('linkItems')) {
        linkItemsNode = node.getNode('linkItems')
        if(linkItemsNode.hasNode('item0')) {
            def size = linkItemsNode.getNodes().size()
            createLinkItem(linkItemsNode, size)
        } else {
            createLinkItem(linkItemsNode, initialIndex)
        }
    } else {
        linkItemsNode = node.addNode('linkItems', 'nt:unstructured')
        createLinkItem(linkItemsNode, initialIndex)
    }

    session.save()
}

def createLinkItem(linkItemsNode, itemIndex) {
    def itemNode = linkItemsNode.addNode("item${itemIndex}", 'nt:unstructured')
    itemNode.setProperty('link', '/content/waters/language-masters/en/search')
    itemNode.setProperty('linkIcon', '/content/dam/waters/brand-assets/icons/search.svg')
    itemNode.setProperty('newWindow', 'false')
    itemNode.setProperty('text', 'Search Application Notes')
}
