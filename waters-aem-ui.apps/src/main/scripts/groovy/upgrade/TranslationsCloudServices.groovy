//Translation Cloud Services
import com.day.cq.wcm.commons.ReferenceSearch

//Copy to the new location
getNode("/conf/global/settings").addNode("cloudconfigs").addNode("translation")
session.save()
copy  "/etc/cloudservices/translation" to "/conf/global/settings/cloudconfigs/translation/translationcfg"

def referenceSearch = new ReferenceSearch()

referenceSearch.setSearchRoot("content/waters")

def map = referenceSearch.search(resourceResolver, "/etc/cloudservices/translation")
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
                    values.add(s.replaceAll("/etc/cloudservices/translation", "/conf/global/settings/cloudconfigs/translation/translationcfg"))
                }
                parentNode.setProperty(name, values as String[])
            } else {
                def stringValue = propertyValue.getString()
                parentNode.setProperty(name, stringValue.replaceAll("/etc/cloudservices/translation", "/conf/global/settings/cloudconfigs/translation/translationcfg"))
            }
        }
    }
}

session.save()

table {
    columns("Page", "Reference")
    rows(data)
}