final def rootPath = '/content/dam/waters/Photography/Products'
final def query = buildQuery(rootPath)

final def result = query.execute()
def buildQuery(rootPath){
	def queryManager = session.workspace.queryManager
	def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$rootPath]) and [jcr:primaryType] = 'dam:Asset'"
	queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
	if(node.getPath().contains('png')){
		node.remove();
	}
}

session.save();
