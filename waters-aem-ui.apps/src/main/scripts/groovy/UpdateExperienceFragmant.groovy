final def pagePath = '/content/waters/tw/zh/library/application-notes/2015'
final def fragmentPath = '/content/experience-fragments/zh_tw/footer-links/footer-links'
final def page = getPage(pagePath)
final def resourceType= 'waters/components/structure/footer'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    if (node.getDepth() > 6) {
        def parNode
        if(node.hasNode('par')) {
           updateExperienceFragmant(node.getNode('par'), fragmentPath)         
        }
    }
   session.save()
}

def updateExperienceFragmant(parNode, fragmentPath) {
    if (parNode.hasNode('experiencefragment')) {
        def xFragNode = parNode.getNode('experiencefragment')
        if(!xFragNode.getProperty('fragmentPath').string.equals(fragmentPath)){
            xFragNode.setProperty('fragmentPath', fragmentPath)
            println 'Experience Fragment path ' + xFragNode.getPath()
             println 'Experience Fragment path ' + xFragNode.getProperty('fragmentPath').string
        }
    }
}