package com.waters.aem.core.components.structure

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.LinkItem
import spock.lang.Unroll

@Unroll
class ExternalHeaderSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        externalheader()
                    }
                }
                two {
                    "jcr:content" {
                        externalheader(
                            logoAltText: "Waters",
                            logoLink: "www.waters.com",
                            newWindow: true
                        ) {
                            logo(fileReference: "/content/dam/waters/logo.png")
                        }
                    }
                }
                three {
                    "jcr:content" {
                        externalheader(
                            logoAltText: "Waters",
                            logoLink: "www.waters.com",
                            newWindow: true
                        ) {
                            linkItems {
                                item1(link: "www.waters.com", text: "waters", newWindow: true)
                                item2(link: "www.ta.com", text: "ta", newWindow: false)
                            }
                        }
                    }
                }
            }
        }

        slingContext.addModelsForClasses(LinkItem)
    }

    def "get header logo"() {
        setup:
        def externalheader = getResource(path).adaptTo(ExternalHeader)

        expect:
        externalheader.logo?.fileReference == fileReference

        where:
        path                                             | fileReference
        "/content/waters/one/jcr:content/externalheader" | null
        "/content/waters/two/jcr:content/externalheader" | "/content/dam/waters/logo.png"
    }

    def "get header logo alt text"() {
        setup:
        def externalheader = getResource(path).adaptTo(ExternalHeader)

        expect:
        externalheader.logoAltText == logoAltText

        where:
        path                                             | logoAltText
        "/content/waters/one/jcr:content/externalheader" | null
        "/content/waters/two/jcr:content/externalheader" | "Waters"
    }

    def "get header logo link"() {
        setup:
        def externalheader = getResource("/content/waters/two/jcr:content/externalheader").adaptTo(ExternalHeader)

        expect:
        externalheader.logoLink

        and:
        externalheader.logoLink.href == "www.waters.com"
    }

    def "is open in new window?"() {
        setup:
        def externalHeader = getResource(path).adaptTo(ExternalHeader)

        expect:
        externalHeader.newWindow == isNewWindow

        where:
        path                                             | isNewWindow
        "/content/waters/one/jcr:content/externalheader" | false
        "/content/waters/two/jcr:content/externalheader" | true
    }

    def "get header links"() {
        setup:
        def externalHeader = getResource("/content/waters/three/jcr:content/externalheader").adaptTo(ExternalHeader)

        expect:
        externalHeader.linkItems.size() == 2

        and:
        externalHeader.linkItems.text == ["waters", "ta"]

        and:
        externalHeader.linkItems.link.href == ["www.waters.com", "www.ta.com"]
    }


}
