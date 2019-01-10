package com.waters.aem.core.components.structure.page

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class ApplicationNotesSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "application-notes"() {
                    "jcr:content"(
                        literatureCode: "ABC",
                        author: ["/etc/tags/waters/abc"],
                        category: ["/etc/tags/waters/abc"],
                        contentType: ["/etc/tags/waters/abc"],
                        instrumentType: ["/etc/tags/waters/abc"],
                        technique: ["/etc/tags/waters/abc"],
                        separationMode: ["/etc/tags/waters/abc"],
                        compoundMatrix: ["/etc/tags/waters/abc"],
                        columnType: ["/etc/tags/waters/abc"],
                        software: ["/etc/tags/waters/abc"],
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

    def "get tags"() {
        setup:
        def applicationNotes = getPage(path).contentResource.adaptTo(ApplicationNotes)

        expect:
        // basic test of field names and values
        applicationNotes.author*.title == title
        applicationNotes.category*.title == title
        applicationNotes.contentType*.title == title
        applicationNotes.instrumentType*.title == title
        applicationNotes.technique*.title == title
        applicationNotes.separationMode*.title == title
        applicationNotes.compoundMatrix*.title == title
        applicationNotes.columnType*.title == title
        applicationNotes.software*.title == title
        applicationNotes.market*.title == title
        applicationNotes.monthPublished*.title == title
        applicationNotes.yearPublished*.title == title

        where:
        path                                | title
        "/content/waters"                   | []
        "/content/waters/application-notes" | ["ABC"]
    }
}
