package com.waters.aem.hybris.importer.impl

import com.waters.aem.hybris.AbstractHybrisImporterSpec
import spock.lang.Unroll

@Unroll
class DefaultHybrisCatalogImporterSpec extends AbstractHybrisImporterSpec {

    def setup() {
        pageBuilder.content {
            waters {
                "language-masters" {
                    en {
                        shop {
                            products {

                            }
                        }
                    }
                }
            }
        }
    }

    def "import catalog pages"() {
        setup:
        def results = hybrisCatalogImporter.importCatalogPages()

        expect:
        results.size() == 11

        and:
        results
    }
}
