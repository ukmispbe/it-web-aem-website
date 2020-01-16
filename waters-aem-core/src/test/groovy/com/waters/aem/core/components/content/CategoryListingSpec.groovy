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
                                           "186008651", "186008726", "186005615", "186007651", "186008544"],
                                categoryPaths:
                                        ["/content/waters/two/applicationkits/accqChemistryKit",
                                         "/content/waters/two/applicationkits/beginnersGuideChromatography",
                                         "/content/waters/two/applicationkits/acquityUplcColumn"]
                        )
                    }
                    applicationkits {
                        accqChemistryKit("accqChemistryKit")
                        beginnersGuideChromatography("beginnersGuideChromatography")
                        acquityUplcColumn("acquityUplcColumn")
                    }
                }
                three {
                    "jcr:content" {
                        categorylisting(
                                itemsPerPage: 5,
                                skuCodes: ["186008525", "186008526", "186008530", "186008531", "186008540",
                                           "186008541", "186008542", "186008545", "186008555", "186008567",
                                           "186008651", "186008726", "186005615", "186007651", "186008544"],
                                categoryPaths:
                                        ["/content/waters/two/applicationkits/accqChemistryKit",
                                         "/content/waters/two/applicationkits/beginnersGuideChromatography",
                                         "/content/waters/two/applicationkits/acquityUplcColumn"]
                        )
                    }
                    applicationkits {
                        accqChemistryKit("accqChemistryKit")
                        beginnersGuideChromatography("beginnersGuideChromatography")
                        acquityUplcColumn("acquityUplcColumn")
                    }
                }
            }
        }

        nodeBuilder.etc {
            commerce {
                products {
                    "186" {
                        "186008525"()
                        "186008526"()
                        "186008530"()
                        "186008531"()
                        "186008540"()
                        "186008541"()
                        "186008542"()
                        "186008545"()
                        "186008555"()
                        "186008567"()
                        "186008651"()
                        "186008726"()
                        "186005615"()
                        "186007651"()
                        "186008544"()
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
        resourcePath                                        | items
        "/content/waters/one/jcr:content/categorylisting"   | CategoryListing.DEFAULT_ITEMS_PER_PAGE
        "/content/waters/two/jcr:content/categorylisting"   | 10
        "/content/waters/three/jcr:content/categorylisting" | 5
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

    def "get category links"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = "/content/waters/two/jcr:content/categorylisting"
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.getCategoryLinks().size() == 3

        and:
        categoryListing.categoryLinks*.href == ["/waters/two/applicationkits/accqChemistryKit.html",
                                                "/waters/two/applicationkits/beginnersGuideChromatography.html",
                                                "/waters/two/applicationkits/acquityUplcColumn.html"]
        and:
        categoryListing.categoryLinks*.title == ["accqChemistryKit", "beginnersGuideChromatography", "acquityUplcColumn"]
    }

    def "get paging for default default"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = "/content/waters/two/jcr:content/categorylisting"
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.getCurrentPageNumber() == 1

        and:
        !categoryListing.hasPreviousPage

        and:
        categoryListing.hasNextPage
    }

    def "get total pages"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = resourcePath
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.pageList.size() == totalPages

        where:
        resourcePath                                        | totalPages
        "/content/waters/two/jcr:content/categorylisting"   | 2
        "/content/waters/three/jcr:content/categorylisting" | 3
    }

    def "get displayable sku sub list"() {
        setup:
        def categoryListing = requestBuilder.build {
            path = "/content/waters/two/jcr:content/categorylisting"
        }.adaptTo(CategoryListing)

        expect:
        categoryListing.displayableSkuSubList.size() == 10
    }

}
