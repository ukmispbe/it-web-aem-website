import groovy.json.JsonOutput
import org.apache.commons.io.IOUtils
import org.apache.jackrabbit.commons.JcrUtils
import java.nio.charset.Charset

def map = [:]

getPage("/content/waters").iterator().each {
    def propertiesMap = [:]
    def contentResource = it.getContentResource()
    if (contentResource!=null) {
        def values = contentResource.getValueMap()
        propertiesMap.put("addToCartUrl", values.get("addToCartUrl"))
        propertiesMap.put("siteConfig", values.get("siteConfig"))
        propertiesMap.put("commerceAPI", values.get("commerceAPI"))
        propertiesMap.put("countryCommerceConfig", values.get("countryCommerceConfig"))

        map.put(it.getPath(), propertiesMap)
    }
}

//Comment the below lines if /tmp/waters exists
getNode("/tmp").addNode("waters")
save()

JcrUtils.putFile(getNode("/tmp/waters"), "commercePageProps.json", "application/json",
        IOUtils.toInputStream(JsonOutput.prettyPrint(JsonOutput.toJson(map)), Charset.defaultCharset()))
save()