import org.apache.commons.lang3.StringUtils

final def pagePath = '/content/waters/ca/fr/library'
final def navigationRoot = '/content/waters/ca/fr'
final def page = getPage(pagePath)
final def resourceType= 'waters/components/structure/header'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    if (node.getDepth() > 6) {
        def path = node.getPath()
        def root = path.substring(0, StringUtils.ordinalIndexOf(path, '/', 5))
        def parNode

        if(node.hasNode('par')) {
             parNode = node.getNode('par')
            updateNavComponent(parNode, root, navigationRoot)
        } 
    }
   session.save()
}

def updateNavComponent(parNode, root, navigationRoot) {
if (parNode.hasNode('navigation')) {
      def navNode = parNode.getNode('navigation')
       if(!navNode.getProperty('navigationRoot').string.equals(navigationRoot)){
         println 'Navigation Node was created at ' + navNode.getProperty('navigationRoot').string
          println 'path ' + navNode.getPath()
          navNode.setProperty('navigationRoot', navigationRoot)
          println 'Navigation Node was created at ' + navNode.getProperty('navigationRoot').string
         
       }
   }
}
