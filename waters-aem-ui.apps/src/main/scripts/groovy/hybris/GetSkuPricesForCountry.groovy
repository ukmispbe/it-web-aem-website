/**
 * For a given country /shop root, print a list of SKU codes and the price for that country
 */

import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.commerce.constants.WatersCommerceConstants
import com.waters.aem.core.commerce.services.SkuRepository
import com.waters.aem.core.components.SiteContext
import com.waters.aem.core.utils.Templates

def basePath = "/content/waters/cn/zh/shop"

def skuRepo = getService(SkuRepository)

def skusWithNoPrice = []
def pagesMissingProductNode = []

getPage(basePath).recurse { p ->
    def page = p.adaptTo(PageDecorator)

    if (Templates.isSkuPage(page)) {
        if (getResource(page.get(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, null)) != null) {
            def sku = skuRepo.getSku(page)
            def siteContext = page.contentResource.adaptTo(SiteContext)
            def country = siteContext.localeWithCountry.country

            def price = sku.getPrice(country, siteContext.currencyIsoCode)

            if (price == null) {
                skusWithNoPrice.add(sku.code)
            } else {
                println "$sku.code $price"
            }
        } else {
            pagesMissingProductNode.add(page.path)
        }
    }
}

if (pagesMissingProductNode.size() > 0) {
    println ""
    println "$pagesMissingProductNode.size pages missing product node"
    pagesMissingProductNode.each { println it }
}

//    println "($skusWithNoPrice.size) Skus with no price under $basePath"
//    skusWithNoPrice.each { println it }
//    println ""

// All /shop base paths for reference

// "/content/waters/us/en/shop"
// "/content/waters/ee/en/shop"
// "/content/waters/pr/en/shop"
// "/content/waters/fi/en/shop"
// "/content/waters/in/en/shop"
// "/content/waters/nz/en/shop"
// "/content/waters/se/en/shop"
// "/content/waters/au/en/shop"
// "/content/waters/pl/en/shop"
// "/content/waters/ie/en/shop"
// "/content/waters/cz/en/shop"
// "/content/waters/my/en/shop"
// "/content/waters/th/en/shop"
// "/content/waters/is/en/shop"
// "/content/waters/no/en/shop"
// "/content/waters/lt/en/shop"
// "/content/waters/ph/en/shop"
// "/content/waters/sg/en/shop"
// "/content/waters/id/en/shop"
// "/content/waters/hk/en/shop"
// "/content/waters/lv/en/shop"
// "/content/waters/dk/en/shop"
// "/content/waters/ca/en/shop"
// "/content/waters/nl/en/shop"
// "/content/waters/hu/en/shop"
// "/content/waters/gb/en/shop"
// "/content/waters/vn/en/shop"
// "/content/waters/xg/en/shop"
// "/content/waters/cn/zh/shop"
// "/content/waters/tw/zh/shop"
// "/content/waters/jp/ja/shop"
// "/content/waters/kr/ko/shop"
// "/content/waters/ch/fr/shop"
// "/content/waters/be/fr/shop"
// "/content/waters/xg/fr/shop"
// "/content/waters/ca/fr/shop"
// "/content/waters/fr/fr/shop"
// "/content/waters/at/de/shop"
// "/content/waters/de/de/shop"
// "/content/waters/ch/de/shop"
// "/content/waters/it/it/shop"
// "/content/waters/mx/es/shop"
// "/content/waters/es/es/shop"
// "/content/waters/xg/es/shop"
// "/content/waters/pt/pt/shop"
// "/content/waters/br/pt/shop"