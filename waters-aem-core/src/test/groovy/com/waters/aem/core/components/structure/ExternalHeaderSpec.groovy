package com.waters.aem.core.components.structure

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.links.BasicLink
import spock.lang.Unroll

@Unroll
class ExternalHeaderSpec extends WatersSpec {

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
                        ) {
                            linkItems {
                                item1(link: "www.waters.com", text: "waters", external: true)
                                item2(link: "www.ta.com", text: "ta", external: false)
                            }
                        }
                    }
                }
            }
        }

        slingContext.addModelsForClasses(BasicLink)
    }

    def "get header logo"() {
        setup:
        def externalHeader = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalHeader)

        expect:
        externalHeader.logo?.fileReference == fileReference

        where:
        resourcePath                                     | fileReference
        "/content/waters/one/jcr:content/externalheader" | null
        "/content/waters/two/jcr:content/externalheader" | "/content/dam/waters/logo.png"
    }

    def "get header logo alt text"() {
        setup:
        def externalHeader = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalHeader)

        expect:
        externalHeader.logoAltText == logoAltText

        where:
        resourcePath                                     | logoAltText
        "/content/waters/one/jcr:content/externalheader" | null
        "/content/waters/two/jcr:content/externalheader" | "Waters"
    }

    def "get header logo link"() {
        setup:
        def externalHeader = requestBuilder.build {
            path = "/content/waters/two/jcr:content/externalheader"
        }.adaptTo(ExternalHeader)

        expect:
        externalHeader.logoLink

        and:
        externalHeader.logoLink.href == "www.waters.com"
    }

    def "get header links"() {
        setup:
        def externalHeader = requestBuilder.build {
            path = "/content/waters/three/jcr:content/externalheader"
        }.adaptTo(ExternalHeader)

        expect:
        externalHeader.linkItems.size() == 2

        and:
        externalHeader.linkItems.text == ["waters", "ta"]

        and:
        externalHeader.linkItems.link.href == ["www.waters.com", "www.ta.com"]
    }
}
