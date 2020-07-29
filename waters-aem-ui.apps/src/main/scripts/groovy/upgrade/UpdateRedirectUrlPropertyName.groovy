final def page = getPage('/content/waters')
final def resourceType= 'foundation/components/redirect'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [cq:PageContent] AS s WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def count =0;

result.nodes.each { node ->
    if(node.hasProperty('redirectTarget')){
        node.setProperty('cq:redirectTarget', node.getProperty('redirectTarget').string)
        node.getProperty('redirectTarget').remove()
        println "Updated " + node.getPath() + "\n"
        count++
    }

    session.save()
}

println count