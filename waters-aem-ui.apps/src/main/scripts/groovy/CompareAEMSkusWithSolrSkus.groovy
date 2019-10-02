import groovy.json.JsonSlurper;

def jsonSlurper = new JsonSlurper()


//Run 
compareDataByContentType(jsonSlurper)



def compareDataByContentType(jsonSlurper) {
    
    def shopPage = pageManager.getPage("/content/waters/us/en/shop")

    Iterator<Page> pageIter = shopPage.listChildren()

    while (pageIter.hasNext()) {
        
        def nextPage = pageIter.next();
     
        def aemList = jsonSlurper.parseText(getAemData(getAemQueryParam(nextPage)))

        def solrList =  jsonSlurper.parseText(getSolrData(getSolrQueryParam(nextPage)))
    
        compareData(aemList, solrList, nextPage.getTitle())
        
        checkForDuplicates(aemList.hits, "hybris:code", "AEM", nextPage.getTitle())
        
        checkForDuplicates(solrList.response.docs, "skucode", "Solr", nextPage.getTitle())
    }
}


def getAemQueryParam(page) {
    return page.getName()
}

def getSolrQueryParam(page) {
    def replaceAmp = page.getTitle().replaceAll("&", "%26")
    def replaceSpace = replaceAmp.replaceAll(" ", "+")
    return "%22"+ replaceSpace +"%22"
}

def compareData(aem, solr, pageName) {
    def skusNotFound = []
    
    aem.hits.each { hit ->
         def notFound = true
        
        solr.response.docs.each { doc ->
           if(doc["skucode"] == hit["hybris:code"]) {
                notFound = false
            }
        }
        
        if (notFound) {
            skusNotFound.add(hit["hybris:code"])
        }
    }
    
    if(skusNotFound.size() > 0) {
        println  "Skus Not found in Solr for Content Type: " +  pageName
        skusNotFound.each {sku ->
            println sku
        }
        println ""
    } else {
        println "Contents are the same for Content Type: " + pageName
        println ""
    }
}
        
def getAemData(contentTypeParam) {
   return "http://test-author.waters.com:4503/bin/querybuilder.json?p.hits=selective&p.properties=hybris%3acode%20jcr%3atitle&path=/content/waters/us/en/shop/${contentTypeParam}&1_property=cq:template&1_property.value=/conf/waters/settings/wcm/templates/sku-page&p.limit=-1&1_property.operation=like&orderby=path".toURL().text
}        

def getSolrData(contentTypeParam) {
    return "http://solrtestslave:8983/solr/waters/select?fl=skucode&fq={!tag%3Dcategory_facet}category_facet:(%22Shop%22)&fq={!tag%3Dcontenttype_facet}contenttype_facet:(${contentTypeParam})&fq=isocode:en_US&rows=10000&q=*:*&timeAllowed=1000".toURL().text
} 


def checkForDuplicates(list, key, source, contentType) {
    def duplicateList = []
    def subMap = list.groupBy { it[key] }
    
    subMap.each {map -> 
        if (map.value.size() > 1){
            duplicateList.add(map.value.get(0)[key])
        }
    }
    if (duplicateList.size() > 0) {
        println "Duplicate Sku in " + source + " for content type: " + contentType 
        duplicateList.each {duplicate ->
            println duplicate
        }
         println ""
    }
    
}
