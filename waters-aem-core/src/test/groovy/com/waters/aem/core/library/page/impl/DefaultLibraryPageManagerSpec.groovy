package com.waters.aem.core.library.page.impl

import com.day.cq.dam.api.DamConstants
import com.waters.aem.core.WatersLibrarySpec
import com.waters.aem.core.constants.WatersConstants
import com.waters.aem.core.library.asset.LibraryAsset
import com.waters.aem.core.library.page.LibraryPageManager
import spock.lang.Stepwise
import spock.lang.Unroll

@Unroll
@Stepwise
class DefaultLibraryPageManagerSpec extends WatersLibrarySpec {

    private static final String ROOT_PATH = "/content/waters/language-masters/en"

    def setupSpec() {
        pageBuilder.content {
            waters() {
                "language-masters"() {
                    en()
                }
            }
        }

        nodeBuilder.content {
            dam("sling:Folder") {
                waters("sling:Folder") {
                    library("sling:Folder") {
                        "test.pdf"("dam:Asset")
                    }
                }
            }
        }

        slingContext.registerService(LibraryPageManager, new DefaultLibraryPageManager())
    }

    def "create library page"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)
        def libraryPage = slingContext.getService(LibraryPageManager).createOrUpdateLibraryPage(libraryAsset)

        expect:
        libraryPage.path == ROOT_PATH + "/library/application-note/2019/library-asset"

        and:
        libraryPage.title == "Library Asset"
        libraryPage.pageTitle == "Library Asset"
        libraryPage.description == "Library Asset Description"

        and:
        def parentPage = libraryPage.getParent(level)

        and:
        parentPage.templatePath == WatersConstants.TEMPLATE_REDIRECT_PAGE
        parentPage.hideInNav
        parentPage.title == title
        parentPage.get(WatersConstants.PROPERTY_REDIRECT_TARGET, "") == ROOT_PATH + "/search.html?facet=category_facet%3Alibrary"

        where:
        level | title
        1     | "2019"
        2     | "Application Note"
        3     | "Library"
    }

    def "update library page"() {
        setup:
        def libraryAssetMetadataNode = getNode("/content/dam/waters/library/asset.pdf/jcr:content/metadata")

        libraryAssetMetadataNode.setProperty(DamConstants.DC_DESCRIPTION, "Updated Description")

        session.save()

        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)

        when:
        def libraryPage = slingContext.getService(LibraryPageManager).createOrUpdateLibraryPage(libraryAsset)

        then:
        libraryPage.description == "Updated Description"
    }

    def "get library page for asset"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)
        def libraryPage = slingContext.getService(LibraryPageManager).getLibraryPage(libraryAsset)

        expect:
        libraryPage.path == ROOT_PATH + "/library/application-note/2019/library-asset"
    }

    def "get library page throws exception for non-library asset"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/test.pdf").adaptTo(LibraryAsset)

        when:
        slingContext.getService(LibraryPageManager).getLibraryPage(libraryAsset)

        then:
        thrown(IllegalStateException)
    }
}
