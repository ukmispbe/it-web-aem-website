final def page = getPage('/content/waters/language-masters/en/application-notes')
final def query = buildQuery(page)
final def result = query.execute()

def buildQuery(page){
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [nt:base] WHERE ISDESCENDANTNODE([$page.path])"
    queryManager.createQuery(queryString, "JCR-SQL2")
}

result.nodes.each { node ->

    node.findAll { it.hasProperties() }.each { nonEmptyNode ->

        nonEmptyNode.getProperties().findAll {it.isMultiple() && it.getType() == 1 }.each { prop ->

            def valueList = []

            prop.getValues().findAll { it.getString() == 'waters:category/applicationslibrary' }.each { val ->
                val.getString() == 'waters:category/applicationslibrary' ? valueList.push('waters:category/library') : valueList.push(val.getString())
            }

            if(valueList){
                nonEmptyNode.setProperty(prop.getName(), valueList as String[])
            }

        }

        session.save()
    }
}


