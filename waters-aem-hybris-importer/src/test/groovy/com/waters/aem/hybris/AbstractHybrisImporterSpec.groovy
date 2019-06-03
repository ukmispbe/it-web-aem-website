package com.waters.aem.hybris

import com.icfolson.aem.prosper.specs.ProsperSpec
import com.waters.aem.core.commerce.services.SkuRepository
import com.waters.aem.core.commerce.services.impl.DefaultSkuRepository
import com.waters.aem.hybris.client.HybrisClient
import com.waters.aem.hybris.client.MockHybrisClient
import com.waters.aem.hybris.importer.HybrisCatalogImporter
import com.waters.aem.hybris.importer.impl.DefaultHybrisCatalogImporter
import spock.lang.Shared
import spock.lang.Unroll

@Unroll
abstract class AbstractHybrisImporterSpec extends ProsperSpec {

    @Shared
    HybrisCatalogImporter hybrisCatalogImporter

    def setupSpec() {
        nodeBuilder.etc {
            commerce {
                products()
            }
        }

        slingContext.registerService(HybrisClient, new MockHybrisClient())
        slingContext.registerService(SkuRepository, new DefaultSkuRepository())

        hybrisCatalogImporter = slingContext.registerInjectActivateService(new DefaultHybrisCatalogImporter())
    }
}
