final def page = getPage('/content/waters/language-masters/zh/library/application-notes')
final def template = '/conf/waters/settings/wcm/templates/application-notes-page'
final def query = buildQuery(page, template)
final def result = query.execute()

def buildQuery(page, template){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [cq:template] = '$template'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    def root = node.getNode('root')

    if(!root.hasNode('breadcrumb')){
        createBreadcrumb(root)
    }

    if(root.hasNode('share')) {
        updateShareComponent(root.getNode('share'))
        root.orderBefore('breadcrumb','share')
    }

    node.setProperty('cq:lastModified', Calendar.getInstance())

    session.save()
}

def createBreadcrumb(rootNode) {
    def breadcrumbNode = rootNode.addNode('breadcrumb', 'nt:unstructured')

    breadcrumbNode.setProperty('sling:resourceType', 'waters/components/content/breadcrumb')
    breadcrumbNode.setProperty('hideCurrent', 'true')
    breadcrumbNode.setProperty('showHidden', 'false')
    breadcrumbNode.setProperty('startLevel', '2')

    def cqResponsiveNode = breadcrumbNode.addNode('cq:responsive', 'nt:unstructured')

    def defaultNode = cqResponsiveNode.addNode('default', 'nt:unstructured')

    defaultNode.setProperty('width', '8')
}

def updateShareComponent(shareComponentNode) {
    def defaultNode = shareComponentNode.getNode('cq:responsive').getNode('default')
    if(defaultNode.hasProperty('behavior')) {
        defaultNode.getProperty('behavior').remove()
    }
    if(defaultNode.hasProperty('offset')) {
        defaultNode.getProperty('offset').remove()
    }
    defaultNode.setProperty('width', '4')
}
