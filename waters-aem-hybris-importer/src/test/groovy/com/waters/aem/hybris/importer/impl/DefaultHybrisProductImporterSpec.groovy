package com.waters.aem.hybris.importer.impl

import com.waters.aem.hybris.AbstractHybrisImporterSpec
import com.waters.aem.hybris.enums.HybrisImportContentType
import com.waters.aem.hybris.enums.HybrisImportStatus
import com.waters.aem.hybris.importer.HybrisProductImporter
import spock.lang.Shared

class DefaultHybrisProductImporterSpec extends AbstractHybrisImporterSpec {

    @Shared
    HybrisProductImporter hybrisProductImporter

    def setupSpec() {
        hybrisProductImporter = slingContext.registerInjectActivateService(new DefaultHybrisProductImporter())
    }

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
        1     | "/etc/commerce/products/186/186007362" | "Quad LCMS QCRM"
    }
}
