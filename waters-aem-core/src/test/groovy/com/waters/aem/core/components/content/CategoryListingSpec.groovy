package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class CategoryListingSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        categorylisting()
                    }
                }
                two {
                    "jcr:content" {
                        categorylisting(
                                itemsPerPage: 10,
                                skuCodes: ["186008525", "186008526", "186008530", "186008531", "186008540",
                                           "186008541", "186008542", "186008545", "186008555", "186008567",
                                           "186008651", "186008726", "1860056151", "186007651", "186008544"],
                                categoryPaths: ["/content/waters/language-masters/en/shop/application-kits/176001235-accq-tag-ultra-chemistry-kit",
                                                "/content/waters/language-masters/en/shop/education/715001531-beginners-guide-to-liquid-chromatography",
                                                "/content/waters/language-masters/en/shop/columns/176000863-acquity-uplc-beh-c18-column-130a-17--m-21-mm-x-50-mm-3-pk"]
                        )
                    }
                }
            }
        }
    }

    def "get items per page"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = resourcePath
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.itemsPerPage == items

        where:
        resourcePath                                      | items
        "/content/waters/one/jcr:content/categorylisting" | CategoryListing.DEFAULT_ITEMS_PER_PAGE
        "/content/waters/two/jcr:content/categorylisting" | 10
    }

    def "get sku codes"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = "/content/waters/two/jcr:content/categorylisting"
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.skuCodes.length == 15
    }

    def "get category paths"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = "/content/waters/two/jcr:content/categorylisting"
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.categoryPaths.length == 3
    }

}
