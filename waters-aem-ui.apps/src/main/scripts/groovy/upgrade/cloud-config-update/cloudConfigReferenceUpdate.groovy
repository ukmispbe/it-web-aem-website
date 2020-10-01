//Script for updating /etc/cloudservices/testandtarget/waterscorporation/framework property value to /etc/cloudservices/testandtarget/waters-xf-integration

import com.day.cq.wcm.commons.ReferenceSearch

def fromProperty = "/etc/cloudservices/testandtarget/waterscorporation/framework"
def toProperty = "/etc/cloudservices/testandtarget/waters-xf-integration"

def referenceSearch = new ReferenceSearch()
referenceSearch.setSearchRoot("content/waters")
def map = referenceSearch.search(resourceResolver, fromProperty)
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
                values.add(s.replaceAll(fromProperty, toProperty))
            }
            parentNode.setProperty(name, values as String[])
            activate(parentNode.getPath())
        } else {
            def stringValue = propertyValue.getString()
            parentNode.setProperty(name, stringValue.replaceAll(fromProperty, toProperty))
        }
    }
    }
}
session.save()

table {
    columns("Page", "Reference")
    rows(data)
}