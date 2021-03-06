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

    if(node.hasNode('logo')) {
        node.getNode('logo').setProperty('fileReference','/content/dam/waters/us/brand-assets/logos/waters-logo-black.svg')

    }
}
session.save()