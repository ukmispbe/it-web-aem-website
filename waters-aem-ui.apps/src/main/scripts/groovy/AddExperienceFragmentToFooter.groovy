final def page = getPage('/content/waters')
final def resourceType= 'waters/components/structure/footer'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    def parNode

    if(!node.hasNode('par')) {
        parNode = node.addNode('par', 'nt:unstructured')

        parNode.setProperty('sling:resourceType', 'wcm/foundation/components/responsivegrid')

        addExperienceFragmant(parNode)
    } else {
        parNode = node.getNode('par')

        addExperienceFragmant(parNode)
    }

    session.save()
}

def addExperienceFragmant(parNode) {
    if (!parNode.hasNode('experiencefragment')) {
        def xFragNode = parNode.addNode('experiencefragment', 'nt:unstructured')

        xFragNode.setProperty('fragmentPath', '/content/experience-fragments/footer-links/footer-links')
        xFragNode.setProperty('sling:resourceType', 'cq/experience-fragments/editor/components/experiencefragment')
    }
}


