final def page = getPage('/content/waters/language-masters/en/application-notes')
final def template = '/conf/waters/settings/wcm/templates/application-notes-page'
final def query = buildQuery(page, template)
final def slash = '/'
final def result = query.execute()

def buildQuery(page, template){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [cq:template] = '$template'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->
    def language = getPage(node.getParent().path).getLanguage().getLanguage()

    if(node.hasProperty('literatureCode') && language) {
        node.setProperty('sling:vanityPath', slash + node.getProperty('literatureCode').string + language.toString().toUpperCase())
        session.save()
    }
}
