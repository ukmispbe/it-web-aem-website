final def page = getPage('/content/waters/language-masters/en')
final def query = buildQuery(page, 'waters/components/content/applicationnotes/externallist')
final def result = query.execute()

def buildQuery(page, component) {
    def queryManager = session.workspace.queryManager;
    def statement = 'select * from nt:base where jcr:path like \''+page.path+'/%\' and sling:resourceType = \'' + component + '\''
    queryManager.createQuery(statement, 'sql')
}

result.nodes.each { node ->
    node.findAll { it.hasNodes() }.each {
        if(it.name.contains("externalLinkItems")){
            it.nodes.each { linkItemNode ->
                println 'itemNodeLink--'+ linkItemNode.get('link')
                linkItemNode.set('link',linkItemNode.get('link').replace("http:", "https:"))
                session.save()
            }
        }
    }
}