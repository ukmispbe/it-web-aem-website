package com.waters.aem.core.components.content;

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.links.BasicLink
import com.waters.aem.core.components.content.links.JsonFields;

class LabelsSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        labels() {
                            labelList {
                                item1(label: "addToCart", labelText: "Add to Cart")
                                item2(label: "orderHistory", labelText: "Order History")
                            }
                            configList {
                                item1(link: "/content/waters/us/en/account/addToCart", text: "addToCartLink")
                                item2(link: "/content/waters/us/en/account/switchCart", text: "switchCartLink")
                            }
                        }

                    }
                }
            }
        }
        slingContext.addModelsForClasses(JsonFields)
        slingContext.addModelsForClasses(BasicLink)
    }

    def "get labels"() {
        setup:
        def labelsSpec = requestBuilder.build {
            path = "/content/waters/one/jcr:content/labels"
        }.adaptTo(Labels)

        expect:
        labelsSpec.labelList.size() == 2

        and:
        labelsSpec.labelList.label == ["addToCart", "orderHistory"]

        and:
        labelsSpec.labelList.labelText == ["Add to Cart", "Order History"]
    }

    def "get configs"() {
        setup:
        def configsSpec = requestBuilder.build {
            path = "/content/waters/one/jcr:content/labels"
        }.adaptTo(Labels)

        expect:
        configsSpec.configList.size() == 2

        and:
        configsSpec.configList.text == ["addToCartLink", "switchCartLink"]

        and:
        configsSpec.configList.link.path == ["/content/waters/us/en/account/addToCart", "/content/waters/us/en/account/switchCart"]
    }
}

