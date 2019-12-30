package com.waters.aem.core.components.structure

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.links.BasicLink
import com.waters.aem.core.components.content.links.IconOnlyLink
import com.waters.aem.core.constants.WatersConstants
import spock.lang.Unroll

@Unroll
class FooterSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        footer(
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

                us("jcr:title": "United States") {
                    en("jcr:title": "English", "cq:template": WatersConstants.TEMPLATE_HOME_PAGE) {
                        "jcr:content" {
                            footer()
                        }
                        "application-notes" {
                            "jcr:content" {
                                footer()
                            }
                        }
                    }
                    es("jcr:title": "Spanish", "cq:template": WatersConstants.TEMPLATE_HOME_PAGE) {
                        "jcr:content" {
                            footer()
                        }
                        "application-notes" {
                            "jcr:content" {
                                footer()
                            }
                        }
                    }
                }

                cn("jcr:title": "China") {
                    zh("jcr:title": "Chinese", "cq:template": WatersConstants.TEMPLATE_HOME_PAGE) {
                        "jcr:content" {
                            footer()
                        }
                        "application-notes" {
                            "jcr:content" {
                                footer()
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
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.logoLink.href == "/content/waters/page1.html"
    }

    def "get alt text"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.logoAltText == "Alternative text"
    }

    def "get copyright text"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.copyrightText == "Waters 2019"
    }

    def "get cookies link"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.cookiesLink.href == "https://www.waters.com/134982469"
    }

    def "get logo image"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.logoImage.fileReference == "/content/dam/waters/logo.png"
    }

    def "get footer links"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.footerLinks.size() == 2

        and:
        footer.footerLinks.text == ["waters", "ta"]

        and:
        footer.footerLinks.link.href == ["www.waters.com", "www.ta.com"]
    }

    def "get social links"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/one/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.socialLinks.size() == 2

        and:
        footer.socialLinks.link.href == ["https://www.facebook.com", "https://twitter.com"]

        and:
        footer.socialLinks.linkIcon == ["/content/dam/waters/brand-assets/icons/facebook.svg", "/content/dam/waters/brand-assets/icons/twitter.svg"]
    }

    def "language selector has one language"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/cn/zh/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.languagePages.size() == 1
    }

    def "language selector has two languages"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/us/en/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.languagePages.size() == 2
    }

    def "language selector item matches current page in other language"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/us/en/application-notes/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.languagePages[1].page.path == "/content/waters/us/es/application-notes"
    }

    def "get country name"() {
        setup:
        def footer = requestBuilder.build {
            path = "/content/waters/us/en/jcr:content/footer"
        }.adaptTo(Footer)

        expect:
        footer.countryName == "United States"
    }
}
