final def page = getPage('/content/order')
final def resourceType= 'waters/components/content/navigation'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def count =0;

result.nodes.each { node ->
    if(node.hasProperty('navigationRoot')){
        node.setProperty('disableShadowing', 'true')
        println "Updated " + node.getPath() + "\n"
        count++
        activate(node.getPath());
    }    
	session.save()
}

println count