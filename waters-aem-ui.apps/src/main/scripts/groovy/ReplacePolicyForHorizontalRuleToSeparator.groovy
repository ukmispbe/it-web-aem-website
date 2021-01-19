final def path = '/conf'
final def query = buildQuery(path)
final def result = query.execute()

def buildQuery(path){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$path]) and ([sling:resourceType] = 'wcm/core/components/policy/policy')"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def count =0

result.nodes.each { node ->
    if(node.getPath().toString().contains('horizontalrule'))
    {
        node.setProperty('jcr:title','Separator');
        node.getSession().move(node.getParent().getPath(),node.getParent().getParent().getPath() + "/separator");
        activate(node.getParent().getPath());
        count++
    }
    session.save();
}
println count
