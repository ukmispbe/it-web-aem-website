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
        def externallist = getResource("/content/waters/one/jcr:content/externallist").adaptTo(ExternalList)

        expect:
        externallist.externalLinkItems.size() == 2

        and:
        externallist.externalLinkItems.text == ["waters", "ta"]

        and:
        externallist.externalLinkItems.link.href == ["www.waters.com", "www.ta.com"]
    }
}
