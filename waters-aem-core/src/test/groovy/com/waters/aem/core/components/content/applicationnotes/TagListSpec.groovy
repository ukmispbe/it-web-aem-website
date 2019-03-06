package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.structure.page.ApplicationNotes
import spock.lang.Unroll

@Unroll
class TagListSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "jcr:content"(
                    compoundMatrix: ["/etc/tags/waters/compoundMatrix/first"],
                    market: ["/etc/tags/waters/market/first", "/etc/tags/waters/market/second"]
                ) {
                    page(
                        tagListType: TagList.TAGS_FROM_CURRENT_PAGE,
                        tags: ["/etc/tags/waters/compoundMatrix", "/etc/tags/waters/market"]
                    )
                    fixed(
                        tagListType: TagList.FIXED_TAGS_LIST,
                        tags: ["/etc/tags/waters/yearPublished/2018", "/etc/tags/waters/yearPublished/2019"]
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

        slingContext.addModelsForClasses(ApplicationNotes)
    }

    def "tags from current page"() {
        setup:
        def tagList = requestBuilder
            .setPath("/content/waters/jcr:content/page")
            .build()
            .adaptTo(TagList)

        expect:
        tagList.listItems.size() == 3

        and:
        tagList.listItems == ["First Class", "First Market", "Second Market"]
    }

    def "fixed tag list"() {
        setup:
        def tagList = requestBuilder
            .setPath("/content/waters/jcr:content/fixed")
            .build()
            .adaptTo(TagList)

        expect:
        tagList.listItems.size() == 2

        and:
        tagList.listItems == ["2018", "2019"]
    }
}
