import groovy.transform.Field

@Field packagesPath = "/etc/packages/waters"
@Field packageName = "shophome-and-sku-templates-with-dependencies"
@Field definitionPath = "$packagesPath/${packageName}.zip/jcr:content/vlt:definition"

def definitionNode = getOrAddDefinitionNode()
def filterNode = getOrAddFilterNode(definitionNode)

// Add templates to be packaged
def templatePaths = ["/conf/waters/settings/wcm/templates/sku-page", "/conf/waters/settings/wcm/templates/shop-home-page"]

def policyPaths = getPolicyPaths(templatePaths)

setPackageFilters(filterNode, policyPaths)

save()


def getOrAddDefinitionNode() {
    def definitionNode

    if (session.nodeExists(definitionPath)) {
        definitionNode = getNode(definitionPath)
    } else {
        def fileNode = getNode(packagesPath).addNode("${packageName}.zip", "nt:file")

        def contentNode = fileNode.addNode("jcr:content", "nt:resource")

        contentNode.addMixin("vlt:Package")
        contentNode.set("jcr:mimeType", "application/zip")

        def stream = new ByteArrayInputStream("".bytes)
        def binary = session.valueFactory.createBinary(stream)

        contentNode.set("jcr:data", binary)

        definitionNode = contentNode.addNode("vlt:definition", "vlt:PackageDefinition")

        definitionNode.set("sling:resourceType", "cq/packaging/components/pack/definition")
        definitionNode.set("name", packageName)
        definitionNode.set("path", "$packagesPath/$packageName")
    }

    definitionNode
}

def getOrAddFilterNode(definitionNode) {
    def filterNode

    if (definitionNode.hasNode("filter")) {
        filterNode = definitionNode.getNode("filter")

        filterNode.nodes.each {
            it.remove()
        }
    } else {
        filterNode = definitionNode.addNode("filter")

        filterNode.set("sling:resourceType", "cq/packaging/components/pack/definition/filterlist")
    }

    filterNode
}

def getPolicyPaths(templatePaths) {
    def policyPaths = []
    def relPath = "policies/jcr:content/root/waters/components/content"

    templatePaths.each { path ->
        def templateNode = getResource(path).adaptTo(Node.class)

        if (templateNode.hasNode(relPath)) {

            def policyContentNode = templateNode.getNode(relPath)

            if (policyContentNode.hasNodes()) {
                traverseNodes(policyContentNode, policyPaths)
            }
        }
    }

    return templatePaths + policyPaths
}

def traverseNodes(parentNode, policyPaths) {

    def policiesBasePath = "/conf/waters/settings/wcm/policies/"

    if (parentNode.hasNodes()) {

        parentNode.nodes.each { node ->
            if (node.hasProperty("sling:resourceType") && node.getProperty("sling:resourceType")
                    .string.equals("wcm/core/components/policies/mapping") && node.hasProperty("cq:policy")) {

                policyPaths.add(policiesBasePath + node.getProperty("cq:policy").string )

            } else {
                traverseNodes(node, policyPaths)
            }
        }
    }
}

def setPackageFilters(filterNode, policyPaths) {
    policyPaths.eachWithIndex { path, index ->
        def f = filterNode.addNode("f$index")
        println path
        println f.getName()

        f.set("mode", "replace")
        f.set("root", path)
        f.set("rules", new String[0])
    }
}

