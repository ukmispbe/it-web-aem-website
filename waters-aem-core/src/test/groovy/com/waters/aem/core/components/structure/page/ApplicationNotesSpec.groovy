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
                        author: ["/content/cq:tags/waters/abc"],
                        affiliations: ["/content/cq:tags/waters/abc"],
                        category: ["/content/cq:tags/waters/abc"],
                        contentType: ["/content/cq:tags/waters/abc"],
                        instrumentTechnique: ["/content/cq:tags/waters/abc"],
                        compoundAnalyte: ["/content/cq:tags/waters/abc"],
                        separationMode: ["/content/cq:tags/waters/abc"],
                        matrix: ["/content/cq:tags/waters/abc"],
                        columnType: ["/content/cq:tags/waters/abc"],
                        products: ["/content/cq:tags/waters/abc"],
                        market: ["/content/cq:tags/waters/abc"],
                        monthPublished: ["/content/cq:tags/waters/abc"],
                        yearPublished: ["/content/cq:tags/waters/abc"]
                    )
                }
            }
        }

        nodeBuilder.content {
            cq:tags("sling:Folder") {
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
        //"/content/waters/application-notes" | 12
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
        //"/content/waters/application-notes" | ["ABC"]
    }
}
