import org.apache.jackrabbit.commons.JcrUtils
import groovy.json.JsonSlurper;

/*
Add path to the countries for which the commerce page properties are to be updated in the array below.
Example: def countries = ["/content/waters/us","/content/waters/gb"]
*/
def countries = []

def stream = JcrUtils.readFile(getNode("/tmp/waters/commercePageProps.json"))
def input = new JsonSlurper().parse(stream)
def data = []

countries.each { country ->
    def contentNode = getNode(country + "/jcr:content")
    def list = []
    input.get(country).each { entry ->
        if (!entry.getValue().equals(null)) {
            contentNode.setProperty(entry.getKey(), entry.getValue())
            list.add(entry.toString())
        }
    }
    data.add([country, list])
    activate(contentNode.getPath())
}

stream.close()
save()

table {
    columns("Country", "Properties")
    rows(data)
}