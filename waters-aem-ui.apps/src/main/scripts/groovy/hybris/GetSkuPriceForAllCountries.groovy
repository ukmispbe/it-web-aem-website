/**
 * For a list of SKU codes, print all live copy SKU pages and the associated price displayed on that page.
 * Also prints a list of any SKU codes not found under /var/commerce/products
 */

import com.day.cq.search.eval.JcrPropertyPredicateEvaluator
import com.day.cq.search.eval.PathPredicateEvaluator
import com.day.cq.wcm.api.NameConstants
import com.day.crx.JcrConstants
import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.commerce.constants.WatersCommerceConstants
import com.waters.aem.core.commerce.services.SkuRepository
import com.waters.aem.core.components.SiteContext
import com.waters.aem.core.services.SiteRepository

import static com.day.cq.search.eval.TypePredicateEvaluator.TYPE

def siteRepo = getService(SiteRepository)
def skuRepo = getService(SkuRepository)

def skuList = [
    "WAT022032",
    "WAT000000"
]

def missingSkus = []

skuList.each { skuCode ->

    if (skuRepo.getSku(resourceResolver, skuCode) == null) {
        missingSkus.add(skuCode)
    } else {
        def languageMasterPagePaths = queryLanguageMasterSkuPagesForCode(skuCode)

        languageMasterPagePaths.each { languageMasterPagePath ->
            // add all live copy paths
            def liveCopyPaths = getLiveCopyPaths(siteRepo, languageMasterPagePath)

            liveCopyPaths.each {
                def page = getPage(it).adaptTo(PageDecorator)

                def sku = skuRepo.getSku(page)
                def siteContext = page.contentResource.adaptTo(SiteContext)
                def country = siteContext.localeWithCountry.country

                def price = sku.getPrice(country, siteContext.currencyIsoCode)

                println "$page.path $price"
            }
        }

        println ""
    }
}

println "$missingSkus.size SKUs missing"
missingSkus.each {
    println it
}

def getLiveCopyPaths(siteRepo, path) {
    def liveCopies = []
    def page = getPage(path)?.adaptTo(PageDecorator)

    if (page != null) {
        siteRepo.getLiveCopyPages(page).each {
            liveCopies.add(it.path)
        }
    }

    return liveCopies
}

def queryLanguageMasterSkuPagesForCode(skuCode) {
    def rootPath = "/content/waters/language-masters/en/shop"

    def predicateGroup = new PredicateGroup();
    predicateGroup.add(new Predicate(TYPE).set(TYPE, NameConstants.NT_PAGE));
    predicateGroup.add(new Predicate(PathPredicateEvaluator.PATH)
            .set(PathPredicateEvaluator.PATH, rootPath));
    predicateGroup.add(new Predicate(JcrPropertyPredicateEvaluator.PROPERTY)
            .set(JcrPropertyPredicateEvaluator.PROPERTY,
                    JcrConstants.JCR_CONTENT + "/" + WatersCommerceConstants.PROPERTY_CODE)
            .set(JcrPropertyPredicateEvaluator.VALUE, skuCode));

    final Query query = queryBuilder.createQuery(predicateGroup, resourceResolver.adaptTo(Session.class));

    def skuPagePaths = [];

    def hits = query.getResult().getHits();

    if (!hits.isEmpty()) {
        skuPagePaths = hits*.resource*.path
    }

    return skuPagePaths
}
