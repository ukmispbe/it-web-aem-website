final def page = getPage('/content/order')
final def resourceType = 'waters/components/content/applicationnotes/sectioncontainer'
final def query = buildQuery(page,resourceType)
final def result = query.execute()

def buildQuery(page,resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and ([sling:resourceType] = '$resourceType' and title = 'Product Support')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    node.setProperty('hideOnEproc', 'true')
    session.save()
}