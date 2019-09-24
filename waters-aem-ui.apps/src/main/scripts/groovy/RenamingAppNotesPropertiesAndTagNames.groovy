
final def page = getPage('/content/waters/language-masters/en/library/application-notes')
final def query = buildQuery(page, 'waters/components/structure/page');
final def result = query.execute()
def buildQuery(page, term) {
    def queryManager = session.workspace.queryManager;
    def statement = 'select * from nt:base where jcr:path like \''+page.path+'/%\' and sling:resourceType = \'' + term + '\'';
    queryManager.createQuery(statement, 'sql');
}
result.nodes.each { node ->

    if(node.hasProperty('instrumentType')){
        updateProperty(node,'instrumentType','instrumentTechnique')
    }

    if(node.hasProperty('separationMode')){
        updateProperty(node,'separationMode','compoundAnalyte')
    }

    if(node.hasProperty('compoundMatrix')){
        updateProperty(node,'compoundMatrix','matrix')
    }

    if(node.hasProperty('software')){
        updateProperty(node,'software','products')
    }

    if(node.hasProperty('technique')){
        updateProperty(node,'technique','separationMode')
    }
}
def updateProperty(node,propertyName,newProperty) {

    def valueList = []
    node.get(propertyName).each{ val ->
        def nodeList = val.split("/");
        val.contains('waters:' + propertyName.toLowerCase()) ? valueList.push('waters:' + newProperty.toLowerCase() + '/' +nodeList[nodeList.length-1])  : valueList.push(val)

    }
    if(valueList.size > 0){
        node.set(newProperty, valueList as String[])
        println "Setting '$newProperty' on '$node.path' with valueList '$valueList' "
    }
    node.set(propertyName,null);
    session.save()
    println 'property removed:' + propertyName

}
println 'Number Of page Found:' + result.nodes.size();


