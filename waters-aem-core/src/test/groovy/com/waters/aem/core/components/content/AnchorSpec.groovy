package com.waters.aem.core.components.content

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.SectionContainer

class AnchorSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "application-notes"() {
                    test() {
                        "jcr:content" {
                            anchor()
                            section1("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Section 1")
                            text("sling:resourceType": Text.RESOURCE_TYPE)
                            section2("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Section 2")
                            image("sling:resourceType": Image.RESOURCE_TYPE)
                            section3("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Section 3")
                        }
                    }
                }
            }
        }
    }

    def "get anchor links"() {
        setup:
        def request = requestBuilder.build {
            path = "/content/waters/application-notes/test/jcr:content/anchor"
        }

        def anchor = request.adaptTo(Anchor)

        expect:
        anchor.links.size() == 3

        and:
        anchor.links*.href == ["#section1", "#section2", "#section3"]

        and:
        anchor.links*.title == ["Section 1", "Section 2", "Section 3"]
    }
}
