final def page = getNode('/content/experience-fragments').getPath()
final def resourceType= '/conf/waters/settings/wcm/templates/experience-fragment'
final def confPathNode = getNode('/conf/waters/settings/wcm/templates/experience-fragment/initial/jcr:content')
def count =0;
if(!confPathNode.hasProperty('cq:xfVariantType')){
        confPathNode.setProperty('cq:xfVariantType', 'web')
        count++
        println "Updated " + confPathNode.getPath() + "\n"
    }

final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [cq:PageContent] AS s WHERE ISDESCENDANTNODE([$page]) and [cq:template] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
  if(!node.hasProperty('cq:xfVariantType')){
        node.setProperty('cq:xfVariantType', 'web')
        println "Updated " + node.getPath() + "\n"
        count++
    }
    
}
session.save()
println 'Total Updated Nodes : '+count