final def page = getPage('/content/waters')
final def query = buildQuery(page)
final def result = query.execute()

def buildQuery(page){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and ([sling:resourceType] = 'waters/components/content/horizontalrule')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def count =0;

result.nodes.each { node ->
	node.setProperty('sling:resourceType', 'waters/components/content/separator');
	activate(node.getPath());
	count++
	session.save();
}
println count
