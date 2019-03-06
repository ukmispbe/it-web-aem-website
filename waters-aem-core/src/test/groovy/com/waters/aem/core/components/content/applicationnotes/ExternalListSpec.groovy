package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class ExternalListSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        externallist {
                            externalLinkItems {
                                item1(link: "www.waters.com", text: "waters")
                                item2(link: "www.ta.com", text: "ta")
                            }
                        }
                    }
                }
            }
        }
    }

    def "get externallist links"() {
        setup:
        def externalList = requestBuilder
            .setPath("/content/waters/one/jcr:content/externallist")
            .build()
            .adaptTo(ExternalList)

        expect:
        externalList.externalLinkItems.size() == 2

        and:
        externalList.externalLinkItems.text == ["waters", "ta"]

        and:
        externalList.externalLinkItems.link.href == ["www.waters.com", "www.ta.com"]
    }
}
