import com.waters.aem.core.commerce.services.SkuRepository
import com.icfolson.aem.library.api.page.PageDecorator

def skuRepository = getService(SkuRepository)

def currentPage = getPage("/content/waters/language-masters/en/shop").adaptTo(PageDecorator)

def productCodeMap = skuRepository.getSkuCodeToPagePathMap(currentPage)

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
