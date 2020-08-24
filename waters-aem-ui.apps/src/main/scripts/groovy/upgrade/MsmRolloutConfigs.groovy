// Multi-site Manager Rollout Configurations
// Update code references
import com.day.cq.wcm.commons.ReferenceSearch

def referenceSearch = new ReferenceSearch()

referenceSearch.setSearchRoot("content")

def map = referenceSearch.search(resourceResolver, "/etc/msm/rolloutconfigs")
def data = []

processThis(map, data)

def processThis(map, data) {
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
                        values.add(s.replaceAll("/etc/msm/rolloutconfigs", "/apps/msm/wcm/rolloutconfigs"))
                    }
                    parentNode.setProperty(name, values as String[])
                } else {
                    def stringValue = propertyValue.getString()
                    parentNode.setProperty(name, stringValue.replaceAll("/etc/msm/rolloutconfigs", "/apps/msm/wcm/rolloutconfigs"))
                }
            }
        }
    }

}

session.save()

table {
    columns("Page", "Reference")
    rows(data)
}