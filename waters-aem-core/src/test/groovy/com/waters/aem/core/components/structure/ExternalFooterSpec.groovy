package com.waters.aem.core.components.structure

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.links.BasicLink
import com.waters.aem.core.components.content.links.IconOnlyLink
import spock.lang.Unroll

@Unroll
class ExternalFooterSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        externalfooter(
                            logoLink: "/content/waters/page1.html",
                            logoAltText: "Alternative text",
                            copyrightText: "Waters 2019",
                            cookiesLink: "https://www.waters.com/134982469"

                        ) {
                            logoImage(fileReference: "/content/dam/waters/logo.png")

                            footerLinks {
                                item1(link: "www.waters.com", text: "waters")
                                item2(link: "www.ta.com", text: "ta")
                            }

                            socialLinks {
                                item1(link: "https://www.facebook.com", linkIcon: "/content/dam/waters/brand-assets/icons/facebook.svg")
                                item2(link: "https://twitter.com", linkIcon: "/content/dam/waters/brand-assets/icons/twitter.svg")
                            }
                        }
                    }
                }
            }
        }
        slingContext.addModelsForClasses(BasicLink)
        slingContext.addModelsForClasses(IconOnlyLink)
    }

    def "get logo link"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.logoLink.href == "/content/waters/page1.html"
    }

    def "get alt text"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.logoAltText == "Alternative text"
    }

    def "get copyright text"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.copyrightText == "Waters 2019"
    }

    def "get cookies link"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.cookiesLink.href == "https://www.waters.com/134982469"
    }

    def "get logo image"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.logoImage.fileReference == "/content/dam/waters/logo.png"
    }

    def "get footer links"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.footerLinks.size() == 2

        and:
        externalFooter.footerLinks.text == ["waters", "ta"]

        and:
        externalFooter.footerLinks.link.href == ["www.waters.com", "www.ta.com"]
    }

    def "get social links"() {
        setup:
        def externalFooter = requestBuilder.build {
            path = "/content/waters/one/jcr:content/externalfooter"
        }.adaptTo(ExternalFooter)

        expect:
        externalFooter.socialLinks.size() == 2

        and:
        externalFooter.socialLinks.link.href == ["https://www.facebook.com", "https://twitter.com"]

        and:
        externalFooter.socialLinks.linkIcon == ["/content/dam/waters/brand-assets/icons/facebook.svg", "/content/dam/waters/brand-assets/icons/twitter.svg"]
    }


}
