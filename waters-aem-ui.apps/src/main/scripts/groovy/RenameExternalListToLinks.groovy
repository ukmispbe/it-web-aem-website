final def page = getPage('/content/waters/language-masters/en/application-notes')
final def resourceType= 'waters/components/content/applicationnotes/externallist'
final def query = buildQuery(page, resourceType)
final def result = query.execute()

def buildQuery(page, resourceType){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [sling:resourceType] = '$resourceType'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    node.setProperty('sling:resourceType', 'waters/components/content/applicationnotes/links')

    def newName = node.getName() == 'externallist' ? 'links' : 'links_' + new Random().nextInt(999999)
    node.getSession().move(node.getPath(), node.getParent().getPath() + "/" + newName)

    def parentNode = node.getParent()
    def size = parentNode.getNodes().findAll {it.getName().contains('links_')}.size()

    parentNode.getNodes().findAll {it.getName().contains('links_')}.each {
        if(parentNode.hasNode('links') && size < 2) {
            parentNode.orderBefore(parentNode.getNode('links').getName(), it.getName())
        }
    }

    session.save()
}