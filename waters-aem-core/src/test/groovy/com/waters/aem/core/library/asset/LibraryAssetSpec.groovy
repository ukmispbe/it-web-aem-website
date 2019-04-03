package com.waters.aem.core.library.asset

import com.day.cq.wcm.api.NameConstants
import com.waters.aem.core.WatersLibrarySpec

class LibraryAssetSpec extends WatersLibrarySpec {

    def "get library asset title"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)

        expect:
        libraryAsset.title == "Library Asset"
    }

    def "get library asset locale"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)

        expect:
        libraryAsset.locale == Locale.ENGLISH
    }

    def "get library asset properties"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)

        expect:
        libraryAsset.properties.intersect([
            (NameConstants.PN_PAGE_TITLE): "Library Asset",
            (NameConstants.PN_DESCRIPTION): "Library Asset Description"
        ]).size() == 2
    }

    def "is library asset?"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)

        expect:
        libraryAsset.libraryAsset
    }

    def "get library asset metadata"() {
        setup:
        def libraryAsset = getResource("/content/dam/waters/library/asset.pdf").adaptTo(LibraryAsset)

        expect:
        libraryAsset.literatureCode == "123"

        and:
        libraryAsset.category*.tagID == ["waters:category/applicationslibrary"]

        and:
        libraryAsset.contentType*.tagID == ["waters:contenttype/applicationnotes"]

        and:
        libraryAsset.market*.tagID == ["waters:market/test"]

        and:
        libraryAsset.product*.tagID == ["waters:product/test"]

        and:
        libraryAsset.event*.tagID == ["waters:event/test"]

        and:
        libraryAsset.technique*.tagID == ["waters:technique/test"]

        and:
        libraryAsset.monthPublished*.tagID == ["waters:month/june"]

        and:
        libraryAsset.yearPublished*.tagID == ["waters:year/2019"]

        and:
        libraryAsset.allTags.size() == 9
    }
}
