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

    if (node.getDepth() > 6) {

        def parNode

        if(!node.hasNode('par')) {
            parNode = node.addNode('par', 'nt:unstructured')

            parNode.setProperty('sling:resourceType', 'wcm/foundation/components/responsivegrid')

            addExperienceFragmant(parNode)
        } else {
            parNode = node.getNode('par')

            addExperienceFragmant(parNode)
        }

        removeImageAndLinks(node)
    }

    session.save()
}

def addExperienceFragmant(parNode) {
    if (!parNode.hasNode('experiencefragment')) {
        def xFragNode = parNode.addNode('experiencefragment', 'nt:unstructured')

        println 'Experience Fragment Node  was created at ' + xFragNode.getPath()

        xFragNode.setProperty('fragmentPath', '/content/experience-fragments/footer-links/footer-links')
        xFragNode.setProperty('sling:resourceType', 'cq/experience-fragments/editor/components/experiencefragment')
        xFragNode.setProperty('jcr:created', Calendar.getInstance())
        xFragNode.setProperty("cq:lastModified", Calendar.getInstance());
    }
}

def removeImageAndLinks(node) {

    if(node.hasNode('footerLinks')) {
        node.getNode('footerLinks').remove()
    }

    if(node.hasNode('socialLinks')) {
        node.getNode('socialLinks').remove()
    }

    if(node.hasNode('logoImage')) {
        node.getNode('logoImage').remove()
    }
}


