def sites = [""] //"language-masters/en","us/en"
def labels = ["":""] //"text0":"link0","text1":"link1"
def data = []

sites.each { site ->
    def nodePath = "/content/waters/" + site + "/cart-checkout/jcr:content/root/labels/configList"
    if (getResource(nodePath) != null) {
        getNode(nodePath).iterator().each {
            labels.keySet().each { labelKey ->
                if (it.hasProperty("text") && it.getProperty("text").getString().equals(labelKey)) {
                    it.setProperty("text", labels.get(labelKey))
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