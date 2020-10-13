//Cloud config reference updates - Script for removing cq:cloudserviceconfigs property values starting with /etc/cloudservices
//Note:- Run this script thrice with fromProperty values as - /etc/cloudservices/sdl-translation/ECICPSL, /etc/cloudservices/translation/sdl-waters-integration
// and /etc/cloudservices/translation/sdl-water-integration-with-assets

import com.day.cq.wcm.commons.ReferenceSearch
def referenceSearch = new ReferenceSearch()
def fromProperty = "/etc/cloudservices/sdl-translation/ECICPSL"
referenceSearch.setSearchRoot("content/waters")
def map = referenceSearch.search(resourceResolver, fromProperty)
def data = []
multicount=0
propcount=0
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
                // println "Property Value  " + s + "  Page Path  " + parentNode.getPath()
                if(s != fromProperty){
                    values.add(s)
                    multicount++
                }else{
                    propcount++
                }
            }
            if(values.isEmpty()){
                println "Property Remove" + propertyValue
                propertyValue.remove()
            }else{
                parentNode.setProperty(name, values as String[])
            }
            activate(parentNode.getPath())
        }
    }
    }
}

println "Multicount..." + multicount
println "Property count" + propcount
session.save()

table {
    columns("Page", "Reference")
    rows(data)
}