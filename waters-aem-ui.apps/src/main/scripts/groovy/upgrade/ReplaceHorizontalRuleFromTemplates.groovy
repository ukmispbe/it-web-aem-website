final def path = '/conf'
final def query = buildQuery(path)
final def result = query.execute()

def buildQuery(path){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$path]) and ([sling:resourceType] = 'wcm/core/components/policies/mapping' and [cq:policy] = 'waters/components/content/horizontalrule/policy_1546443454758')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}
def count =0

result.nodes.each { node ->
    println node.getPath()
    node.setProperty('cq:policy', 'waters/components/content/separator/policy_1546443454758');
    node.getSession().move(node.getPath(),node.getParent().getPath() + "/separator");
    count++
    session.save();
}
println count
