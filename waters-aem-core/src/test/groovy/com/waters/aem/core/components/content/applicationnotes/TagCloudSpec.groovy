package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.SiteContext
import com.waters.aem.core.components.structure.page.ApplicationNotes
import spock.lang.Unroll

@Unroll
class TagCloudSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "jcr:content"(
                    compoundMatrix: ["/etc/tags/waters/compoundMatrix/first"],
                    market: ["/etc/tags/waters/market/first", "/etc/tags/waters/market/second"]
                ) {
                    page(
                        title: "keywords",
                        tags: ["/etc/tags/waters/compoundMatrix", "/etc/tags/waters/market"]
                    )
                }
            }
        }

        nodeBuilder.etc {
            tags("sling:Folder") {
                waters("cq:Tag") {
                    compoundMatrix("cq:Tag") {
                        first("cq:Tag", "jcr:title": "First Class")
                        second("cq:Tag", "jcr:title": "Second Class")
                    }
                    market("cq:Tag") {
                        first("cq:Tag", "jcr:title": "First Market")
                        second("cq:Tag", "jcr:title": "Second Market")
                    }
                    yearPublished() {
                        "2017"("cq:Tag", "jcr:title": "2017")
                        "2018"("cq:Tag", "jcr:title": "2018")
                        "2019"("cq:Tag", "jcr:title": "2019")
                    }
                }
            }
        }

        slingContext.addModelsForClasses(SiteContext)
        slingContext.addModelsForClasses(ApplicationNotes)
    }

    def "get tagcloud title"() {
        setup:
        def tagCloud = getResource("/content/waters/jcr:content/page").adaptTo(TagCloud)

        expect:
        tagCloud.title == "keywords"
    }

    def "get tagcloud searchFacets"() {
        setup:
        def tagCloud = getResource("/content/waters/jcr:content/page").adaptTo(TagCloud)

        expect:
        tagCloud.searchFacets.size() == 3

        and:
        tagCloud.searchFacets*.title == ["First Class", "First Market", "Second Market"]

        and:
        tagCloud.searchFacets*.filter == [
            "compoundMatrix_facet:First Class",
            "market_facet:First Market",
            "market_facet:Second Market"
        ]
    }
}
