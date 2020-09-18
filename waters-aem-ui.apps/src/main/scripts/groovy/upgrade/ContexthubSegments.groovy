//ContextHub Segments
//Post running the script, check for the ContextHub Segments to be disabled, as before
import com.day.cq.wcm.commons.ReferenceSearch

//Move Context Hub.
getNode("/conf/global/settings").addNode("wcm")
session.save()
copy  "/etc/segmentation/contexthub" to "/conf/global/settings/cloudsettings"

def referenceSearch = new ReferenceSearch()

referenceSearch.setSearchRoot("content/waters")

def map = referenceSearch.search(resourceResolver, "/etc/segmentation/contexthub")
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
                    values.add(s.replaceAll("/etc/segmentation/contexthub", "/conf/global/settings/wcm/segments"))
                }
                parentNode.setProperty(name, values as String[])
            } else {
                def stringValue = propertyValue.getString()
                parentNode.setProperty(name, stringValue.replaceAll("/etc/segmentation/contexthub", "/conf/global/settings/wcm/segments"))
            }
        }
    }
}

session.save()

table {
    columns("Page", "Reference")
    rows(data)
}