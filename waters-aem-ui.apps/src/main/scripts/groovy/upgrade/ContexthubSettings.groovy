//ContextHub Configurations
import com.day.cq.wcm.commons.ReferenceSearch

//Copy the folder to the new location
copy  "/etc/cloudsettings" to "/conf/global/settings/cloudsettings"

def referenceSearch = new ReferenceSearch()

referenceSearch.setSearchRoot("content/waters")

def map = referenceSearch.search(resourceResolver, "/etc/cloudsettings")
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
                    values.add(s.replaceAll("/etc/cloudsettings", "/conf/global/settings/cloudsettings"))
                }
                parentNode.setProperty(name, values as String[])
            } else {
                def stringValue = propertyValue.getString()
                parentNode.setProperty(name, stringValue.replaceAll("/etc/cloudsettings", "/conf/global/settings/cloudsettings"))
            }
        }
    }
}

session.save()

table {
    columns("Page", "Reference")
    rows(data)
}