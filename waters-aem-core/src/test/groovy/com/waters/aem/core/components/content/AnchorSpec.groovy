package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.applicationnotes.SectionContainer
import com.waters.aem.core.constants.WatersConstants

class AnchorSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "application-notes"() {
                    test() {
                        "jcr:content" {
                            anchor()
                            section1("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Section 1")
                            text("sling:resourceType": Text.RESOURCE_TYPE)
                            section2("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Section 2")
                            image("sling:resourceType": Image.RESOURCE_TYPE)
                            section3("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Section 3")
                        }
                    }
                }

                products() {
                    "186007517"() {
                        "jcr:content"(
                                "cq:template": WatersConstants.TEMPLATE_SKU_PAGE,
                                "hybris:code": "186007517",
                                "hybris:productResourcePath": "/etc/commerce/products/186/186007517") {
                            anchor()
                            section1("sling:resourceType": SectionContainer.RESOURCE_TYPE,
                                    title: "Product Description") {
                                par {
                                    text("sling:resourceType": Text.RESOURCE_TYPE)
                                }
                            }
                            section2("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Specifications") {
                                par {
                                    specificationstable("sling:resourceType": SpecificationsTable.RESOURCE_TYPE)
                                }
                            }
                            section3("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Related Products") {
                                par {
                                    skulist("sling:resourceType": SkuList.RESOURCE_TYPE)
                                }
                            }
                            section4("sling:resourceType": SectionContainer.RESOURCE_TYPE, title: "Product Support")
                        }
                    }
                }
            }
        }
    }

    def "get anchor links"() {
        setup:
        def anchor = requestBuilder.build {
            path = "/content/waters/application-notes/test/jcr:content/anchor"
        }.adaptTo(Anchor)

        expect:
        anchor.links.size() == 3

        and:
        anchor.links*.href == ["#section1", "#section2", "#section3"]

        and:
        anchor.links*.title == ["Section 1", "Section 2", "Section 3"]
    }

    def "get anchor link count with empty related products section"() {
        setup:
        def anchor = requestBuilder.build {
            path = "/content/waters/products/186007517/jcr:content/anchor"
        }.adaptTo(Anchor)

        expect:
        anchor.links.size() == 3
    }
}
