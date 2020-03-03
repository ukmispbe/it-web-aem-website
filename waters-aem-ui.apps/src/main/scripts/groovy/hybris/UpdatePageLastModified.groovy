/**
 * Use this script to set the jcr:lastModified property on all language master SKU pages with the current time.
 * This is a maintenance script that should be executed whenever a large set of SKU pages have a lastModified date earlier than
 * the associated product node's lastModified time. If too many language master pages have lastModified earlier than the product node,
 * the hybris importer will spend a lot of time updating the language master and live copies copies with the current timestamp which
 * will slow down the import job.
 *
 * A dryRun flag is used to print how many language master pages have an older lastModified date before committing any actual changes.
 * Change this value to dryRun = false to have the script update and commit the JCR changes.
 */
import com.day.cq.commons.jcr.JcrConstants
import com.day.cq.wcm.api.NameConstants
import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.commerce.constants.WatersCommerceConstants
import com.waters.aem.core.commerce.models.Sku
import com.waters.aem.core.commerce.services.SkuRepository
import com.waters.aem.core.utils.Templates
import org.apache.sling.api.resource.ModifiableValueMap

def dryRun = true

def basePath = "/content/waters/language-masters/en/shop"

def skuRepo = getService(SkuRepository)

def lastModifiedDate = Calendar.getInstance()

def skuPageCount = 0

getPage(basePath).recurse { p ->
    def page = p.adaptTo(PageDecorator)

    if (Templates.isSkuPage(page)) {
        if (getResource(page.get(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, null)) != null) {

            Sku sku = skuRepo.getSku(page)

            if (sku.lastModified.after(page.get(JcrConstants.JCR_LASTMODIFIED, Calendar).orNull())) {
                println "$page.path modified before $sku.path"

                skuPageCount++

                //update page's lastModified timestamp to today
                if (!dryRun) {
                    def properties = page.contentResource.adaptTo(ModifiableValueMap)

                    properties.put(JcrConstants.JCR_LASTMODIFIED, lastModifiedDate)
                    properties.put(NameConstants.PN_PAGE_LAST_MOD, lastModifiedDate)
                }

                if (skuPageCount > 0 && skuPageCount % 100 == 0) {
                    if (!dryRun) {
                        println "Committing JCR changes to Session after 100 changes..."
                        save()
                    }
                }
            }
        }
    }
}

println "$skuPageCount pages modified before the associated product node"

if (!dryRun) {
    save()
}
