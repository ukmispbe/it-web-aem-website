import groovy.json.JsonSlurper;

import java.io.File;
import java.io.FileOutputStream;

import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.apache.poi.ss.usermodel.*;

import groovy.json.JsonSlurper;

def basePath =  "/Users/nlapaglia/Downloads/"

//Run 
compareHybrisToAem(basePath)


def compareHybrisToAem(basePath) {
    
    DataFormatter dataFormatter = new DataFormatter();

    def jsonSlurper = new JsonSlurper()
    
    def map = [
          // columnsBulk: [aem: "columns--bulk-media", fileLocation: "%22Columns+%26+Bulk+Media%22"], 
           samplePreparation: [aem: "sample-preparation--filtration", fileLocation: basePath + "Sample Prep & Filtration - test.xlsx"]
          // vialsContainers: [aem: "vials-containers--collection-plates", fileLocation: "%22Vials,%20Containers,+%26+Collection+Plates%22"],
          // standardsReagents: [aem: "standards--reagents", fileLocation: "%22Standards+%26+Reagents%22"],
          // education: [aem: "education", fileLocation: "%22Education%22"],
          // software: [aem: "software", fileLocation: "%22Software%22"],
          // obsoleteDiscontinued: [aem: "obsolete-discontinued-products", fileLocation: "%22Obsolete+Discontinued+Products%22"],
         //  applicationKits: [aem: "application-kits", fileLocation: "%22Application+Kits%22"],
          // miscellaneous: [aem: "miscellaneous", fileLocation: "%22Miscellaneous%22"],
         //  systemInstruments: [aem: "systems--instruments", fileLocation: "%22System+%26+Instruments%22"],
         //  serviceParts: [aem: "service-parts--kits", fileLocation: "%22Service+Parts+%26+Kits%22"],
         //  servicePlans: [aem: "service-plans", fileLocation: "%22Service+Plans%22"],
    ]
    
    map.each {contentType ->
        def workbook = WorkbookFactory.create(new File(map[contentType.key].fileLocation))
        def sheet = workbook.getSheetAt(0)
        def aemList = jsonSlurper.parseText(getAemData(map[contentType.key].aem))
        compareData(sheet, aemList, dataFormatter,  map[contentType.key].aem)
        workbook.close()
    }
}



def compareData(sheet, aemList, dataFormatter, contentType) {
    def skusNotFound = []
    
    sheet.each {row -> 
    
    def cell = row.getCell(0)
    def cellValue =  dataFormatter.formatCellValue(cell)
    
    def notFound = true
    
    aemList.hits.each { hit ->
        if(hit["hybris:code"] == cellValue) {
                notFound = false
            }
        }
        
        if (notFound) {
            skusNotFound.add(cellValue)
        }
    }
    
    if(skusNotFound.size() > 0) {
        println  "Skus Not found in Solr for Content Type: " + contentType
        skusNotFound.each {sku ->
            println sku
        }
        println ""
    } else {
        println "Contents are the same for Content Type: " + contentType
        println ""
    }
}

def getAemData(contentTypeParam) {
   return "http://test-author.waters.com:4503/bin/querybuilder.json?p.hits=selective&p.properties=hybris%3acode%20jcr%3atitle&path=/content/waters/us/en/shop/${contentTypeParam}&1_property=cq:template&1_property.value=/conf/waters/settings/wcm/templates/sku-page&p.limit=-1&1_property.operation=like&orderby=path".toURL().text
} 

