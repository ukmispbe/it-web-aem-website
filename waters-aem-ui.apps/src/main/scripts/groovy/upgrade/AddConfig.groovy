def sites = [""] //"language-masters/en","us/en"
def labels = ["":""] //"text0":"link0","text1":"link1"
def data = []

sites.each { site ->
    def nodePath = "/content/waters/" + site + "/cart-checkout/jcr:content/root/labels/configList"
    if (getResource(nodePath) != null) {
        def parent = getNode(nodePath)
        labels.keySet().each { labelKey ->
            def iNum = parent.getNodes().getSize()
            def item = parent.addNode("item"+iNum)
            item.setProperty("text", labelKey)
            item.setProperty("link", labels.get(labelKey))
            save()
            if (!nodePath.contains("language-masters"))
                activate(item.getPath())
            data.add([nodePath, item.getPath()])
        }
    }
}

table {
    columns("Parent", "Label")
    rows(data)
}