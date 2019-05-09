final def page = getPage('/content/waters/language-masters/en/application-notes')
final def template = '/conf/waters/settings/wcm/templates/application-notes-page'
final def query = buildQuery(page, template)
final def result = query.execute()

def buildQuery(page, template){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [cq:template] = '$template'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.findAll {it.hasProperty('contentType')}.each { node ->

    node.getProperty('contentType').getValues().findAll {it.getString() == 'waters:contenttype/applicationbrief'}.each {
        def rootNode = node.getNode('root')

        if(!rootNode.hasNode('contentfragment') && rootNode.hasNode('anchor')){
            createFragment(rootNode)
            rootNode.orderBefore('contentfragment', 'anchor')
        }

        replaceContentTypeTag(node)
    }

    session.save()
}

def replaceContentTypeTag(node){
    node.setProperty('contentType', ['waters:contenttype/applicationnotes']  as String[])
}

def createFragment(rootNode){
    def fragmentNode = rootNode.addNode('contentfragment', 'nt:unstructured')
    fragmentNode.setProperty('element', 'main')
    fragmentNode.setProperty('fileReference', '/content/dam/waters/content-fragments/alerts/application-brief')
    fragmentNode.setProperty('sling:resourceType', 'dam/cfm/components/contentfragment')
    fragmentNode.setProperty('text', 'This is an Application Brief and does not contain a detailed Experimental section.')
    fragmentNode.setProperty('variation', 'master')

    def parNode = fragmentNode.addNode('par1', 'nt:unstructured')
    parNode.setProperty('sling:resourceType', 'wcm/foundation/components/responsivegrid')

    def cqResponsiveNode = fragmentNode.addNode('cq:responsive', 'nt:unstructured')

    def defaultNode = cqResponsiveNode.addNode('default', 'nt:unstructured')

    defaultNode.setProperty('width', '12')
}

