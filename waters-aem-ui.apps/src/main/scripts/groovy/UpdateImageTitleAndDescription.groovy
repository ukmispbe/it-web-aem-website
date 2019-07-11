final def rootPath = '/content/dam/waters/app-notes'
final def query = buildQuery(rootPath)
final def result = query.execute()

def buildQuery(rootPath){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [dam:Asset] WHERE ISDESCENDANTNODE([$rootPath])"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    if(node.getName().endsWith('jpg')) {

        def name = node.getName()

        def metadataNode = getMetadataNode(node)

        if(!metadataNode.hasProperty('photoshop:TransmissionReference')) {
            metadataNode.setProperty('photoshop:TransmissionReference', name.substring(0, name.indexOf('-')))
        }

        session.save()
    }

}

def getMetadataNode(node) {
    def contentNode = node.getNode('jcr:content')

    return contentNode.getNode('metadata')
}

