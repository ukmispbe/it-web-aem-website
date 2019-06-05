package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.applicationnotes.LinkItem
import spock.lang.Unroll

@Unroll
class NotificationSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        notification()
                    }
                }
                two {
                    "jcr:content" {
                        notification (
                                title: "Hazardous",
                                description: "This product contains hazardous material",
                                icon: "/content/dam/waters/brand-assets/icons/externallink.svg",
                        )
                    }
                }
                three {
                    "jcr:content" {
                        notification (
                                title: "Hazardous",
                                description: "This product contains hazardous material",
                                icon: "/content/dam/waters/brand-assets/icons/externallink.svg",
                        ) {
                            linkItems {
                                item1(link: "www.waters.com", text: "details", newWindow: true)
                                item2(link: "www.test.com", text: "apply to cart", newWindow: false)
                            }
                        }
                    }
                }

            }
        }
        slingContext.addModelsForClasses(LinkItem)
    }

    def "get notification title"() {
        setup:
        def notification = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Notification)

        expect:
        notification.title == title

        where:
        resourcePath                                   | title
        "/content/waters/one/jcr:content/notification" | null
        "/content/waters/two/jcr:content/notification" | "Hazardous"
    }

    def "get notification description"() {
        setup:
        def notification = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Notification)

        expect:
        notification.description == desc

        where:
        resourcePath                                   | desc
        "/content/waters/one/jcr:content/notification" | null
        "/content/waters/two/jcr:content/notification" | "This product contains hazardous material"
    }

    def "get notification icon"() {
        setup:
        def notification = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Notification)

        expect:
        notification.icon == icon

        where:
        resourcePath                                   | icon
        "/content/waters/one/jcr:content/notification" | null
        "/content/waters/two/jcr:content/notification" | "/content/dam/waters/brand-assets/icons/externallink.svg"
    }


    def "get notification link items"() {
        setup:
        def notification = requestBuilder.build {
            path = "/content/waters/three/jcr:content/notification"
        }.adaptTo(Notification)

        expect:
        notification.linkItems.size() == 2

        and:
        notification.linkItems.text == ["details", "apply to cart"]

        and:
        notification.linkItems.link.href == ["www.waters.com", "www.test.com"]

        and:
        notification.linkItems.newWindow == [true, false]
    }
}
