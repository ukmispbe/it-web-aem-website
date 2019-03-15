final def page = getPage('/content/waters/language-masters/en/application-notes')
final def template = '/conf/waters/settings/wcm/templates/application-notes-page'
final def query = buildQuery(page, template)
final def result = query.execute()

def buildQuery(page, template){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [cq:template] = '$template'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    def rootNode = node.getNode('root')

    if(!session.itemExists(rootNode.getPath() + '/tagcloud')){
        createTagCloud(rootNode)
    }

    def size = rootNode.getNodes().size()

    rootNode.getNodes().eachWithIndex { childNode , index ->

        if(index == size - 2 && childNode.getProperty('sling:resourceType').string.equals('waters/components/content/text')){
            rootNode.orderBefore('tagcloud',  childNode.getName())
        }

    }

    session.save()
}

def createTagCloud(rootNode) {
    def tagCloudNode = rootNode.addNode('tagcloud', 'nt:unstructured')

    String[] tags = ['waters:instrumenttype', 'waters:technique', 'waters:compoundmatrix', 'waters:market']

    tagCloudNode.setProperty('sling:resourceType', 'waters/components/content/applicationnotes/tagcloud')
    tagCloudNode.setProperty('title', 'Tags')
    tagCloudNode.setProperty('tags', tags)

    def cqResponsiveNode = tagCloudNode.addNode('cq:responsive', 'nt:unstructured')

    def defaultNode = cqResponsiveNode.addNode('default', 'nt:unstructured')

    defaultNode.setProperty('width', '12')
}
