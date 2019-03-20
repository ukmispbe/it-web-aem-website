final def page = getPage('/content/waters/language-masters/en/application-notes')
final def template = '/conf/waters/settings/wcm/templates/application-notes-page'
final def tags = ['author', 'affiliations', 'category', 'contentType', 'columnType', 'instrumentType', 'market', 'monthPublished', 'yearPublished', 'software', 'technique', 'separationMode']
final def query = buildQuery(page, template)
final def result = query.execute()

def buildQuery(page, template){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path]) and [cq:template] = '$template'"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    tags.each { tagCategory ->

        if(node.hasProperty(tagCategory)) {
            node.getProperty(tagCategory).getValues().each { value ->
                if(!value.toString().contains(tagCategory.toLowerCase())) {
                    println 'Page: ' + node.getParent().getPath()
                    println 'Property: ' + tagCategory + " - " + value.toString()
                }
            }
        }

    }
}


