package com.waters.aem.core.components.structure


import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class ExternalFooterSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        externalfooter(
                            logoLink : "/content/waters/page1.html",
                            logoAltText : "Alternative text",
                            copyrightText : "Waters 2019"
                        )
                    }
                }
            }
        }
    }

    def "get logo link"() {
        setup:
        def externalFooter = getResource("/content/waters/one/jcr:content/externalfooter").adaptTo(ExternalFooter)

        expect:
        externalFooter.logoLink.href == "/content/waters/page1.html"
    }

    def "get alt text"() {
        setup:
        def externalFooter = getResource("/content/waters/one/jcr:content/externalfooter").adaptTo(ExternalFooter)

        expect:
        externalFooter.logoAltText == "Alternative text"
    }

    def "get copyright text"() {
        setup:
        def externalFooter = getResource("/content/waters/one/jcr:content/externalfooter").adaptTo(ExternalFooter)

        expect:
        externalFooter.copyrightText == "Waters 2019"
    }
}
