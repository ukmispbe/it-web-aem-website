final def page = getPage('/content/waters/language-masters/en/application-notes')
final def query = buildQuery(page, 'waters/components/content/button')
final def result = query.execute()

def buildQuery(page, component) {
    def queryManager = session.workspace.queryManager;
    def statement = 'select * from nt:base where jcr:path like \''+page.path+'/%\' and sling:resourceType = \'' + component + '\''
    queryManager.createQuery(statement, 'sql')
}

result.nodes.each { node ->
    println 'buttonPath --'+ node.path
    println 'buttonLink --'+ node.get('buttonLink')
    node.set('buttonLink',node.get('buttonLink').replace("http:", "https:"))
    session.save()
}
   