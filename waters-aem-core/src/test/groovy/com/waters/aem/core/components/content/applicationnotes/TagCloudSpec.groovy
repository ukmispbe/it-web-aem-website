package com.waters.aem.core.components.content.applicationnotes

import com.waters.aem.core.WatersLibrarySpec
import com.waters.aem.core.components.SiteContext
import com.waters.aem.core.components.structure.page.ApplicationNotes
import com.waters.aem.core.constants.WatersConstants
import spock.lang.Unroll

@Unroll
class TagCloudSpec extends WatersLibrarySpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "jcr:content"(
                    "cq:template": WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE,
                    contentType: ["/etc/tags/waters/contenttype/applicationnote"],
                    category: ["/etc/tags/waters/category/library"],
                    compoundMatrix: ["/etc/tags/waters/matrix/first"],
                    market: ["/etc/tags/waters/market/first", "/etc/tags/waters/market/second"]
                ) {
                    tagcloud(
                        title: "keywords",
                        tags: ["/etc/tags/waters/matrix", "/etc/tags/waters/market"]
                    )
                }
                library {
                    "jcr:content"(
                        "cq:template": WatersConstants.TEMPLATE_LIBRARY_PAGE,
                        (WatersConstants.PROPERTY_LIBRARY_ASSET_PATH): "/content/dam/waters/library/asset.pdf"
                    ) {
                        tagcloud(tags: ["/etc/tags/waters/matrix", "/etc/tags/waters/market"])
                    }
                }
            }
        }

        slingContext.addModelsForClasses(SiteContext)
        slingContext.addModelsForClasses(ApplicationNotes)
    }

    def "get tagcloud title"() {
        setup:
        def tagCloud = requestBuilder.build {
            path = "/content/waters/jcr:content/tagcloud"
        }.adaptTo(TagCloud)

        expect:
        tagCloud.title == "keywords"
    }

    def "get content type"() {
        setup:
        def tagCloud = requestBuilder.build {
            path = resourcePath
        }.adaptTo(TagCloud)

        expect:
        tagCloud.contentType == "applicationnote"

        where:
        resourcePath << ["/content/waters/jcr:content/tagcloud", "/content/waters/library/jcr:content/tagcloud"]
    }

    def "get category capitalized"() {
        setup:
        def tagCloud = requestBuilder.build {
            path = resourcePath
        }.adaptTo(TagCloud)

        expect:
        tagCloud.category == "Library"

        where:
        resourcePath << ["/content/waters/jcr:content/tagcloud", "/content/waters/library/jcr:content/tagcloud"]
    }

    def "get tagcloud searchFacets"() {
        setup:
        def tagCloud = requestBuilder.build {
            path = "/content/waters/jcr:content/tagcloud"
        }.adaptTo(TagCloud)

        expect:
        tagCloud.searchFacets.size() == 2

        and:
        tagCloud.searchFacets*.name == ["first", "second"]

        and:
        tagCloud.searchFacets*.title == ["First Market", "Second Market"]

        and:
        tagCloud.searchFacets*.filter == [
            "market_facet:First Market",
            "market_facet:Second Market"
        ]
    }
}