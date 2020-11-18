def sites = [""] //"language-masters/en","us/en"
def labels = ["":""] //"labelKey0":"labelValue0","labelKey1":"labelValue1"
def data = []

sites.each { site ->
    def nodePath = "/content/waters/" + site + "/cart-checkout/jcr:content/root/labels/labelList"
    if (getResource(nodePath) != null) {
        def parent = getNode(nodePath)
        labels.keySet().each { labelKey ->
            def iNum = parent.getNodes().getSize()
            def item = parent.addNode("item"+iNum)
            item.setProperty("labelKey", labelKey)
            item.setProperty("labelValue", labels.get(labelKey))
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