package com.waters.aem.core.components.structure.page

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class ApplicationNotesSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "application-notes"() {
                    "jcr:content"(
                        literatureCode: "ABC",
                        author: ["/etc/tags/waters/abc"],
                        affiliations: ["/etc/tags/waters/abc"],
                        category: ["/etc/tags/waters/abc"],
                        contentType: ["/etc/tags/waters/abc"],
                        instrumentTechnique: ["/etc/tags/waters/abc"],
                        compoundAnalyte: ["/etc/tags/waters/abc"],
                        separationMode: ["/etc/tags/waters/abc"],
                        matrix: ["/etc/tags/waters/abc"],
                        columnType: ["/etc/tags/waters/abc"],
                        products: ["/etc/tags/waters/abc"],
                        market: ["/etc/tags/waters/abc"],
                        monthPublished: ["/etc/tags/waters/abc"],
                        yearPublished: ["/etc/tags/waters/abc"]
                    )
                }
            }
        }

        nodeBuilder.etc {
            tags("sling:Folder") {
                waters("cq:Tag") {
                    abc("cq:Tag", "jcr:title": "ABC")
                }
            }
        }
    }

    def "get literature code"() {
        setup:
        def applicationNotes = getPage("/content/waters/application-notes").contentResource.adaptTo(ApplicationNotes)

        expect:
        applicationNotes.literatureCode == "ABC"
    }

    def "get all tags"() {
        setup:
        def applicationNotes = getPage(path).contentResource.adaptTo(ApplicationNotes)

        expect:
        applicationNotes.allTags.size() == size

        where:
        path                                | size
        "/content/waters"                   | 0
        "/content/waters/application-notes" | 12
    }

    def "get tags"() {
        setup:
        def applicationNotes = getPage(path).contentResource.adaptTo(ApplicationNotes)

        expect:
        // basic test of field names and values
        applicationNotes.author*.title == title
        applicationNotes.category*.title == title
        applicationNotes.contentType*.title == title
        applicationNotes.instrumentTechnique*.title == title
        applicationNotes.compoundAnalyte*.title == title
        applicationNotes.separationMode*.title == title
        applicationNotes.matrix*.title == title
        applicationNotes.columnType*.title == title
        applicationNotes.products*.title == title
        applicationNotes.market*.title == title
        applicationNotes.monthPublished*.title == title
        applicationNotes.yearPublished*.title == title
        applicationNotes.affiliations*.title == title

        where:
        path                                | title
        "/content/waters"                   | []
        "/content/waters/application-notes" | ["ABC"]
    }
}
