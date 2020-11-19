def data = []
def buildQuery(page, damPath) {
    def queryManager = session.workspace.queryManager;
    def statement = 'select * from nt:base where jcr:path like \''+page.path+'/%\' and contains(*, \''+damPath+'\')';
    queryManager.createQuery(statement, 'sql');
}
final def damPath = '/content/dam/waters/en/app-notes/2016/'
final def page = getPage('/content/waters/language-masters/en/library/application-notes/2016/')
final def query = buildQuery(page, damPath);
final def result = query.execute()

result.nodes.each { node ->
    node.getProperties().findAll {it.isMultiple() && it.getType() == 1 }.each { prop ->
        prop.getValues().findAll { it.getString().contains(damPath) }.each { val ->
            data.add([node.path, prop.name,val.getString(),resourceResolver.getResource(val.getString()) != null])
        }
    }
    node.getProperties().findAll {!it.isMultiple() && it.getType() == 1 }.each { prop ->
        if(prop.getString().contains(damPath)){
            if(resourceResolver.getResource(prop.getString()) == null){
                data.add([node.path, prop.name,prop.getString(),resourceResolver.getResource(prop.getString()) != null])
            }
        }
    }
}
table {
    columns("Node Path", "Property Name","Property Value" ,"Available")
    rows(data)
}
