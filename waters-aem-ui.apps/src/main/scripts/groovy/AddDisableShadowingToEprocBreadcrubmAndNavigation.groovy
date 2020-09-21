final def page = getPage('/content/order')
final def query = buildQuery(page)
final def result = query.execute()

def buildQuery(page){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and ([sling:resourceType] = 'waters/components/content/navigation' or [sling:resourceType] = 'waters/components/content/breadcrumb')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
	node.setProperty('disableShadowing', 'true')
	println "Updated " + node.getPath() + "\n"
	session.save()
}
