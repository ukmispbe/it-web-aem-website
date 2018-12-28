package com.waters.aem.core.components.structure

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.ExternalList
import spock.lang.Unroll

@Unroll
class HeaderSpec extends AemLibraryModelSpec {

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
                                logo: "/content/dam/waters/logo/waters.png",
                                logoLink: "www.waters.com",
                                newWindow: true
                        )
                    }
                }
            }
        }
    }

    def "get header logo alt text"() {
        setup:
        def header = getResource(path).adaptTo(Header)

        expect:
        header.logoAltText == logoAltText

        where:
        path                                     | logoAltText
        "/content/waters/one/jcr:content/header" | null
        "/content/waters/two/jcr:content/header" | "Waters"
    }

    def "get header logo"() {
        setup:
        def header = getResource("/content/waters/two/jcr:content/header").adaptTo(Header)

        expect:
        header.logo

        and:
        header.logo.href == "/content/dam/waters/logo/waters.png"
    }

    def "get header logo link"() {
        setup:
        def header = getResource("/content/waters/two/jcr:content/header").adaptTo(Header)

        expect:
        header.logoLink

        and:
        header.logoLink.href == "www.waters.com"
    }

    def "is open in new window?"() {
        setup:
        def header = getResource(path).adaptTo(Header)

        expect:
        header.newWindow == isNewWindow

        where:
        path                                     | isNewWindow
        "/content/waters/one/jcr:content/header" | false
        "/content/waters/two/jcr:content/header" | true
    }


}
