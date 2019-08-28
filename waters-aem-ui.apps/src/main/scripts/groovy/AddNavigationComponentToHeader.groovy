import org.apache.commons.lang3.StringUtils

final def page = getPage('/content/waters')
final def resourceType= 'waters/components/structure/header'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    def path = node.getPath()
    def root = path.substring(0, StringUtils.ordinalIndexOf(path, '/', 5))
    def parNode

    if(!node.hasNode('par')) {
        parNode = node.addNode('par', 'nt:unstructured')

        parNode.setProperty('sling:resourceType', 'wcm/foundation/components/responsivegrid')

        createNavComponent(parNode, root)
    } else {
        parNode = node.getNode('par')

        createNavComponent(parNode, root)
    }

    session.save()
}

def createNavComponent(parNode, root) {

    if (!parNode.hasNode('navigation')) {
        def navNode = parNode.addNode('navigation', 'nt:unstructured')

        navNode.setProperty('collectAllPages', 'false')
        navNode.setProperty('structureDepth', '2')
        navNode.setProperty('skipNavigationRoot', 'true')
        navNode.setProperty('sling:resourceType', 'waters/components/content/navigation')
        navNode.setProperty('navigationRoot', root)

        def cqResponsiveNode = navNode.addNode('cq:responsive', 'nt:unstructured')

        def defaultNode = cqResponsiveNode.addNode('default', 'nt:unstructured')

        defaultNode.setProperty('width', '12')
    }
}




