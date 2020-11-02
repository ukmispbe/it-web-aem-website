def sites = [""] //"language-masters/en","us/en"
def labels = ["":""] //"labelKey0":"labelValue0","labelKey1":"labelValue1"
def data = []

sites.each { site ->
    def nodePath = "/content/waters/" + site + "/cart-checkout/jcr:content/root/labels/labelList"
    if (getResource(nodePath) != null) {
        getNode(nodePath).iterator().each {
            labels.keySet().each { labelKey ->
                if (it.hasProperty("labelKey") && it.getProperty("labelKey").getString().equals(labelKey)) {
                    it.setProperty("labelValue", labels.get(labelKey))
                    save()
                    if (!nodePath.contains("language-masters"))
                        activate(it.getPath())
                    data.add([nodePath, it.getPath()])
                }
            }
        }
    }
}

table {
    columns("Parent", "Label")
    rows(data)
}