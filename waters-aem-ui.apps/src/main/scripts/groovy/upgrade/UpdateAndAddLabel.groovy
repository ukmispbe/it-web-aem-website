def sites = [""] //"language-masters/en","us/en"
def labels = ["": ""] //"labelKey0":"labelValue0","labelKey1":"labelValue1"
def data = []

sites.each { site ->
    def nodePath = "/content/waters/" + site + "/cart-checkout/jcr:content/root/labels/labelList"
    if (getResource(nodePath) != null) {
        labels.keySet().each { labelKey ->
            def count = 0
            NodeIterator nodeIterator = getNode(nodePath).getNodes();
            while (nodeIterator.hasNext()) {
                Node nextNode = nodeIterator.nextNode();
                if (nextNode.hasProperty("labelKey") && nextNode.getProperty("labelKey").getString().equals(labelKey)) {
                    nextNode.setProperty("labelValue", labels.get(labelKey))
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
                item.setProperty("labelKey", labelKey)
                item.setProperty("labelValue", labels.get(labelKey))
                save()
                if (!nodePath.contains("language-masters"))
                    activate(item.getPath())
                data.add([labelKey, item.getPath()])
            }
        }
    }
}
table {
    columns("Parent", "Label")
    rows(data)
}