final def page = getPage('/content/waters/language-masters')
final def resourceType= 'waters/components/structure/externalheader'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    node.setProperty('sling:resourceType', 'waters/components/structure/header')

    if(node.hasNode('regionLinkItem')) {
        node.getNode('regionLinkItem').remove()
    }

    if(node.hasNode('linkItems')) {
        node.getNode('linkItems').remove()
    }

    node.getSession().move(node.getPath(), node.getParent().getPath() + "/" + "header")


    session.save()
}
