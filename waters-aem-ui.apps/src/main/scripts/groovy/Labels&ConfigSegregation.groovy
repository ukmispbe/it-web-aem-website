def sites = [""]
def labelMap = [":"]
def configMap = [":"]
def category = ""
def parentNodePath = "/content/waters/us/en/cart-checkout/jcr:content/root"
def count = 0
sites.each {site ->
    def parent = getNode(parentNodePath).addNode("labels_0")//"/content/waters/"+ site +"/cart-checkout/jcr:content/root/labels_0"
    parent.setProperty("sling:resourceType","waters/components/content/labels")
    parent.setProperty("category", category)
    save()
    def child = parent.addNode("labelList")
    def configChild = parent.addNode("configList")
    save()

    labelMap.each {
        def item = child.addNode("item" + count)
        count++
        save()
        item.setProperty("labelKey", it.key)
        item.setProperty("labelValue", it.value)
        save()
    }
    count = 0

    configMap.each {
        def item = configChild.addNode("item" + count)
        count++
        save()
        item.setProperty("text", it.key)
        item.setProperty("link", it.value)
        save()
    }
    activate("/content/waters/us/en/cart-checkout") //"/content/waters/"+ site +"/cart-checkout"
}