//Commerce Products References
//Note - Please run the script only after importing the products into /var/commerce/products, through the Hybris Importer
import com.day.cq.wcm.commons.ReferenceSearch

def referenceSearch = new ReferenceSearch()

referenceSearch.setSearchRoot("content/waters")

def map = referenceSearch.search(resourceResolver, "/etc/commerce/products")
def data = []

map.each { path, info ->
    info.properties.each { ref -> each {
            data.add([path, ref])
            def resource = getResource(ref)
            def name = resource.getName()
            def parent = resource.getParent()
            def parentNode = getNode(parent.getPath())
            def propertyValue = parentNode.getProperty(name)
            if (propertyValue.isMultiple()) {
                def values = []
                for (String s in propertyValue.getValues()) {
                    values.add(s.replaceAll("/etc/commerce/products", "/var/commerce/products"))
                }
                parentNode.setProperty(name, values as String[])
            } else {
                def stringValue = propertyValue.getString()
                parentNode.setProperty(name, stringValue.replaceAll("/etc/commerce/products", "/var/commerce/products"))
            }
        }
    }
}

getNode("/etc/commerce/products").remove()
session.save()

table {
    columns("Page", "Reference")
    rows(data)
}