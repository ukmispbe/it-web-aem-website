final def path = '/conf/waters/settings/wcm'
final def query = buildQuery(path)
final def result = query.execute()

def buildQuery(path){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$path]) and ([jcr:primaryType] = 'cq:PageContent')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def count = 0
result.nodes.each { node ->
    if(node.path.contains('initial') && node.hasProperty('cq:lastReplicated') && node.hasProperty('cq:lastReplicatedBy') && node.hasProperty('cq:lastReplicationAction')){
        node.getProperty('cq:lastReplicated').remove()
        node.getProperty('cq:lastReplicatedBy').remove()
        node.getProperty('cq:lastReplicationAction').remove()
        println node.path
        count ++
    }
    session.save();
}
println count