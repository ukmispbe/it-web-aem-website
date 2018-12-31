package com.waters.aem.core.components.structure

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
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
                        )
                    }
                }
            }
        }
    }

    def "get header logo alt text"() {
        setup:
        def externalheader = getResource(path).adaptTo(ExternalHeader)

        expect:
        externalheader.logoAltText == logoAltText

        where:
        path                                     | logoAltText
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
        path                                     | isNewWindow
        "/content/waters/one/jcr:content/externalheader" | false
        "/content/waters/two/jcr:content/externalheader" | true
    }


}
