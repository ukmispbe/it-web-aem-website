final def page = getPage('/content/waters')
final def template = '/conf/waters/settings/wcm/templates/redirect-page'
def dryRun = true;
final def query = buildQuery(page, template)
final def result = query.execute()
def buildQuery(page, template) {
    def queryManager = session.workspace.queryManager
    def queryString = "SELECT * FROM [cq:Page] As node WHERE ISDESCENDANTNODE (node, [$page.path]) and node.[jcr:content/cq:template] = '$template' and node.[jcr:content/sling:redirectStatus] = '302'"
    queryManager.createQuery(queryString, "JCR-SQL2")

}
result.nodes.each {
    node->
        def jcrcontent = node.getNode("jcr:content")
        if (jcrcontent.hasProperty('sling:redirectStatus')) {
            if (jcrcontent.getProperty('sling:redirectStatus').getString().equals("302")) {
                jcrcontent.setProperty('sling:redirectStatus', '301')
            }
            if (!dryRun && !node.getPath().contains("language-masters")) {
                activate(jcrcontent.getPath());
                println node.getPath()
            }
        }
        if (!dryRun) {
            session.save()
        }
}