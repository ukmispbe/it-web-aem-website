final def resourceType = 'waters/components/structure/page'
def buildQuery(page,resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType' and [currencyIsoCode] <> ''"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

def basePaths = [
        "/content/waters/language-masters/en"
].each { 
  basePath -> 
  try {
      final def page = getPage(basePath) 
      final def query = buildQuery(page,resourceType)
      final def result = query.execute()

      println "Result :" + result.getNodes().size()

      result.nodes.each { 
        node ->
          if(node.hasProperty("currencyIsoCode")) {
              println "${node.path}: ${node.getProperty('currencyIsoCode').string}"
              node.getProperty('currencyIsoCode').remove()
              session.save()
              activate(node.path);
          }
      }
  } catch (Exception e) {
        println "Exception Occurred while fetching path" + e
    }
}
