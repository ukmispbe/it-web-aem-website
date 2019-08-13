package com.waters.aem.core.components.structure

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.links.BasicLink
import spock.lang.Unroll

@Unroll
class HeaderSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        header()
                    }
                }
                two {
                    "jcr:content" {
                        header(
                            logoAltText: "Waters",
                            logoLink: "www.waters.com",
                        ) {
                            logo(fileReference: "/content/dam/waters/logo.png")
                        }
                    }
                }
            }
        }

        slingContext.addModelsForClasses(BasicLink)
    }

    def "get header logo"() {
        setup:
        def header = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Header)

        expect:
        header.logo?.fileReference == fileReference

        where:
        resourcePath                                     | fileReference
        "/content/waters/one/jcr:content/header" | null
        "/content/waters/two/jcr:content/header" | "/content/dam/waters/logo.png"
    }

    def "get header logo alt text"() {
        setup:
        def header = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Header)

        expect:
        header.logoAltText == logoAltText

        where:
        resourcePath                                     | logoAltText
        "/content/waters/one/jcr:content/header" | null
        "/content/waters/two/jcr:content/header" | "Waters"
    }

    def "get header logo link"() {
        setup:
        def header = requestBuilder.build {
            path = "/content/waters/two/jcr:content/header"
        }.adaptTo(Header)

        expect:
        header.logoLink

        and:
        header.logoLink.href == "www.waters.com"
    }
}
