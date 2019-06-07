package com.waters.aem.core.components.content.applicationnotes

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class LinksSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        links {
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

    def "get links links"() {
        setup:
        def links = requestBuilder.build {
            path = "/content/waters/one/jcr:content/links"
        }.adaptTo(Links)

        expect:
        links.externalLinkItems.size() == 2

        and:
        links.externalLinkItems.text == ["waters", "ta"]

        and:
        links.externalLinkItems.link.href == ["www.waters.com", "www.ta.com"]
    }
}
