//Note - This script will be used only on stage for updating URLs that are starting with /waters and pointing to prod.

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
def updatedCount =0;

result.nodes.each { node ->
    if(node.hasProperty('cq:redirectTarget')){
        value = node.getProperty('cq:redirectTarget').getString()
        println "Absolute Redirect " + node.getProperty('cq:redirectTarget').getString() + " on node " + node.getPath() + "\n"
        if(value.startsWith('https://www.waters.com/waters')){
            updatedVal = value.replace('https://www.waters.com/','https://legacy-stage.waters.com/')
            node.setProperty('cq:redirectTarget', updatedVal)
            activate(node.getPath())
            println "Updated Redirect Path from " + value + " to \n " + updatedVal + " on node " + node.getPath() + "\n"
            updatedCount++
        }
        count++
    }

    save()

}

println count
println updatedCount