final def page = getPage('/content/waters/language-masters/en')
final def template = '/conf/waters/settings/wcm/templates/redirect-page'
def dryRun = false;
final def query = buildQuery(page,template)
final def result = query.execute()
def buildQuery(page,template){
    def queryManager = session.workspace.queryManager
def queryString ="SELECT * FROM [cq:Page] As node WHERE ISDESCENDANTNODE (node, [$page.path]) and node.[jcr:content/cq:template] = '$template' and node.[jcr:content/sling:redirectStatus] = '302'"
    queryManager.createQuery(queryString, "JCR-SQL2")
           
}
result.nodes.each { node ->
 def jcrcontent= node.getNode("jcr:content")
    if(jcrcontent.hasProperty('sling:redirectStatus')){
        jcrcontent.setProperty('sling:redirectStatus', '301')

  if(!dryRun) {
            activate(jcrcontent.getPath());
            }
    }
        if(!dryRun) {
    session.save()
}

}

