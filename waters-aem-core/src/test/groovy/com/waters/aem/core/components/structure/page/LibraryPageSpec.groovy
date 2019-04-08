package com.waters.aem.core.components.structure.page

import com.waters.aem.core.WatersLibrarySpec
import com.waters.aem.core.constants.WatersConstants

class LibraryPageSpec extends WatersLibrarySpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "language-masters" {
                    en {
                        library {
                            "application-notes" {
                                "2019" {
                                    test("Test") {
                                        "jcr:content"(
                                            (WatersConstants.PROPERTY_LIBRARY_ASSET_PATH):
                                                "/content/dam/waters/library/asset.pdf"
                                        )
                                    }
                                    "no-asset"()
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    def "get library asset"() {
        setup:
        def libraryPage = getPage("/content/waters/language-masters/en/library/application-notes/2019/test")
            .contentResource.adaptTo(LibraryPage)

        expect:
        libraryPage.libraryAsset.path == "/content/dam/waters/library/asset.pdf"
    }

    def "get library asset metadata"() {
        setup:
        def libraryPage = getPage("/content/waters/language-masters/en/library/application-notes/2019/test")
            .contentResource.adaptTo(LibraryPage)

        expect:
        libraryPage.literatureCode == "123"

        and:
        libraryPage.category*.tagID == ["waters:category/library"]

        and:
        libraryPage.contentType*.tagID == ["waters:contenttype/applicationnotes"]

        and:
        libraryPage.market*.tagID == ["waters:market/test"]

        and:
        libraryPage.product*.tagID == ["waters:product/test"]

        and:
        libraryPage.event*.tagID == ["waters:event/test"]

        and:
        libraryPage.technique*.tagID == ["waters:technique/test"]

        and:
        libraryPage.monthPublished*.tagID == ["waters:month/june"]

        and:
        libraryPage.yearPublished*.tagID == ["waters:year/2019"]

        and:
        libraryPage.allTags.size() == 9
    }

    def "library page is null when asset path is null"() {
        expect:
        !getPage("/content/waters/language-masters/en/library/application-notes/2019/no-asset").contentResource.adaptTo(
            LibraryPage)
    }
}
