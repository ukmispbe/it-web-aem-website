final def page = getPage('/content/waters/us/en/products')
final def resourceType= 'foundation/components/redirect'
final def query = buildQuery(page, resourceType)
final def result = query.execute()
def dryRun = true; //to save and publish the change, make it false

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [cq:PageContent] AS s WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def count =0;

result.nodes.each { node ->
    if(node.hasProperty('sling:redirectStatus')){
        node.setProperty('sling:redirectStatus', '301')
        println "Updated " + node.getPath() + "\n"
        count++
        if(!dryRun) {
            activate(node.getPath());
        }
    }
    if(!dryRun) {
        session.save()
    }

}

println count