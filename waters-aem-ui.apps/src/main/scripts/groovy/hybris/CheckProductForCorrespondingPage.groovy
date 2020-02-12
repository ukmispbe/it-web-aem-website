import com.waters.aem.core.commerce.services.SkuRepository
import com.icfolson.aem.library.api.page.PageDecorator

/** This script will iterate through all the imported products stored in the jcr and check if the product
 *  has a corresponding page created under language-masters. If the page doesn't exist it prints out the product code
 */

def skuRepository = getService(SkuRepository)

//Get the catalog root page path
def currentPage = getPage("/content/waters/language-masters/en/shop").adaptTo(PageDecorator)

//Call method to create a map of all existing product pages under the catalog root page
def productCodeMap = skuRepository.getSkuCodeToPagePathMap(currentPage)

 // Iterate through products and check the map for existing pages based on the product code and print code for products
 // with non-existing pages
getNode("/etc/commerce/products").nodes.each { folderNode ->
    folderNode.nodes.each { productNode ->
        if (productNode.hasProperty("hybris:code")) {

            def hybrisCode = productNode.getProperty("hybris:code").string

            if (productCodeMap.get(hybrisCode) == null) {
                println hybrisCode
            }
        }
    }
}
