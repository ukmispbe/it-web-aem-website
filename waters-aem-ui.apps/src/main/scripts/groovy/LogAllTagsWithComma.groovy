final def rootPath = '/etc/tags/waters'
final def query = buildQuery(rootPath)
final def result = query.execute()

def buildQuery(rootPath){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$rootPath]) and [jcr:title] IS NOT NULL"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    if(node.getProperty('jcr:title').getString().contains(',')){
        println node.getPath()
    }
}

