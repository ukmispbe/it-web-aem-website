def sites = [""] //"language-masters/en","us/en"
def configs = ["":""] //"text0":"link0","text1":"link1"
def data = []

sites.each { site ->
    def nodePath = "/content/waters/" + site + "/cart-checkout/jcr:content/root/labels/configList"
    if (getResource(nodePath) != null) {
        configs.keySet().each { configKey ->
            def count = 0
            NodeIterator nodeIterator = getNode(nodePath).getNodes();
            while (nodeIterator.hasNext()) {
                Node nextNode = nodeIterator.nextNode();
                if (nextNode.hasProperty("text") && nextNode.getProperty("text").getString().equals(configKey)) {
                    nextNode.setProperty("link", configs.get(configKey))
                    save()
                    if (!nodePath.contains("language-masters"))
                        activate(nextNode.getPath())
                    count++
                    data.add([nodePath, nextNode.getPath()])
                }
            }
            if (count==0) {
                def iNum = getNode(nodePath).getNodes().getSize()
                def item = getNode(nodePath).addNode("item"+iNum)
                item.setProperty("text", configKey)
                item.setProperty("link", configs.get(configKey))
                save()
                if (!nodePath.contains("language-masters"))
                    activate(item.getPath())
                data.add([configKey, item.getPath()])
            }
        }
    }
}
table {
    columns("Parent", "Label")
    rows(data)
}