package com.waters.aem.hybris.importer.impl


import com.waters.aem.core.commerce.constants.WatersCommerceConstants
import com.waters.aem.core.commerce.models.Sku
import com.waters.aem.core.commerce.models.SkuImageType
import com.waters.aem.hybris.AbstractHybrisImporterSpec
import com.waters.aem.hybris.enums.HybrisImportContentType
import com.waters.aem.hybris.enums.HybrisImportStatus
import spock.lang.Unroll

@Unroll
class DefaultHybrisProductImporterSpec extends AbstractHybrisImporterSpec {

    def "import products for product codes"() {
        setup:
        def results = hybrisProductImporter.importProducts(["176001744", "186007362"])

        expect:
        results.size() == 2

        and:
        def result = results.get(index)

        result.path == path
        result.title == title
        result.contentType == HybrisImportContentType.PRODUCT
        result.status == HybrisImportStatus.CREATED

        where:
        index | path                                   | title
        0     | "/etc/commerce/products/176/176001744" | "PFC Analysis Kit"
        1     | "/etc/commerce/products/186/186007362" | "Quad LCMS QC reference Material"
    }

    def "import all products"() {
        setup:
        def results = hybrisProductImporter.importProducts(false)

        expect:
        results.size() == 12
    }

    def "product node properties match exported product JSON"() {
        setup:
        hybrisProductImporter.importProducts(["176001744"])

        expect:
        def properties = getResource("/etc/commerce/products/176/176001744").valueMap

        properties.get(WatersCommerceConstants.PROPERTY_CODE, "") == "176001744"
        properties.get(WatersCommerceConstants.PROPERTY_UNSPSC, "") == "3435765"
        properties.get(WatersCommerceConstants.PROPERTY_NAME, "") == "PFC Analysis Kit"
        properties.get(WatersCommerceConstants.PROPERTY_SHORT_DESCRIPTION,
                "") == "Waters ACQUITY UPLC total solution for the analysis of Perfluorinated Compounds (PFCs)."
        properties.get(WatersCommerceConstants.PROPERTY_LONG_DESCRIPTION,
                "") == "Waters ACQUITY UPLC total solution for the analysis of Perfluorinated Compounds (PFCs).  The kit " +
                "contains ACQUITY BEH C18 column, PFC isolator column, and other PFCs-free components optimized for use " +
                "with the ACQUITY system.  Sample preparation consumables such as Oasis HLB cartridges, PFC calibration " +
                "standards, PFC unknown QC standards, and sample vials are also included."
        properties.get(WatersCommerceConstants.PROPERTY_CATEGORIES,
                new String[0]) == ["Columns"] as String[]

        and:
        !properties.get(WatersCommerceConstants.PROPERTY_TERMINATED, false)
        !properties.get(WatersCommerceConstants.PROPERTY_PROPRIETARY, false)
        !properties.get(WatersCommerceConstants.PROPERTY_COLD_CHAIN_SHIPPING, false)
        !properties.get(WatersCommerceConstants.PROPERTY_HAZARDOUS, false)
    }

    def "primary sku image is ordered first"() {
        setup:
        hybrisProductImporter.importProducts(["176001744"])

        expect:
        def sku = getResource("/etc/commerce/products/176/176001744").adaptTo(Sku)

        sku.images[0].imageType == SkuImageType.PRIMARY
    }
}
