final def page = getPage('/content/waters/language-masters/en/library/application-notes')
final def query = buildQuery(page)
final def result = query.execute()

def buildQuery(page){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and ([sling:resourceType] = 'waters/components/structure/page' or [sling:resourceType] = 'waters/components/content/image')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    node.hasNode('thumbnailImage') ? processImage(node.getNode('thumbnailImage')) : processImage(node)

    session.save()
}

def processImage(node) {
    if (node.hasProperty('fileReference') && node.getProperty('fileReference').getString().endsWith('png')) {
        node.setProperty('fileReference', node.getProperty('fileReference').getString().replaceAll('png', 'jpg'))
    }
}

