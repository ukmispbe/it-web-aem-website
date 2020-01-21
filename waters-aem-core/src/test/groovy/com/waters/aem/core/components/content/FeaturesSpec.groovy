package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.links.BasicLink
import spock.lang.Unroll

import java.util.stream.Collectors

@Unroll
class FeaturesSpec extends WatersSpec {
    def setupSpec() {
        slingContext.addModelsForClasses(BasicLink);
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        features {
                            features {
                                item1(title: "Order Products Online*", description: "Order online, save to shopping favorites, and see your order history.", icon: "/content/dam/waters/en/brand-assets/icons/cart.svg") {
                                    links {
                                        item1(link: "www.waters.com", text: "waters")
                                    }
                                }
                                item2(title: "Manage your account", description: "Update your profile, add a support account, and more!", icon: "/content/dam/waters/en/brand-assets/icons/user.svg") {
                                    links {
                                        item1(link: "www.waters.com", text: "waters")
                                    }
                                }
                                item3(title: "Access to support", description: "Get access to exclusive support content, the Graphical Parts Locator, Certificates of Analysis, software updates, etc.", icon: "/content/dam/waters/en/brand-assets/icons/troubleshooting.svg") {
                                    links {
                                        item1(link: "www.waters.com", text: "waters")
                                    }
                                }
                            }
                        }
                    }
                }
                two {
                    "jcr:content" {
                        features {
                            features {
                                item1(title: "We can help!", description: "For registration and account support", icon: "/content/dam/waters/en/brand-assets/icons/life-buoy.svg") {
                                    links {
                                        item1(link: "www.waters.com", text: "Contact Waters")
                                        item2(link: "www.waters.com", text: "Contact Waters")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    def "get Features list"() {
        setup:
        def featureList = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Features)

        expect:
        featureList.features.size() == size

        where:
        resourcePath                               | size
        "/content/waters/one/jcr:content/features" | 3
        "/content/waters/two/jcr:content/features" | 1
    }

    def "get Features list titles"() {
        setup:
        def featureList = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Features)

        expect:
        featureList.features.title == titles

        where:
        resourcePath                               | titles
        "/content/waters/one/jcr:content/features" | ["Order Products Online*", "Manage your account", "Access to support"]
        "/content/waters/two/jcr:content/features" | ["We can help!"]
    }

    def "get Features list descriptions"() {
        setup:
        def featureList = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Features)

        expect:
        featureList.features.description == descriptions

        where:
        resourcePath                               | descriptions
        "/content/waters/one/jcr:content/features" | ["Order online, save to shopping favorites, and see your order history.", "Update your profile, add a support account, and more!", "Get access to exclusive support content, the Graphical Parts Locator, Certificates of Analysis, software updates, etc."]
        "/content/waters/two/jcr:content/features" | ["For registration and account support"]
    }

    def "get Features list icons"() {
        setup:
        def featureList = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Features)

        expect:
        featureList.features.icon == icons

        where:
        resourcePath                               | icons
        "/content/waters/one/jcr:content/features" | ["/content/dam/waters/en/brand-assets/icons/cart.svg", "/content/dam/waters/en/brand-assets/icons/user.svg", "/content/dam/waters/en/brand-assets/icons/troubleshooting.svg"]
        "/content/waters/two/jcr:content/features" | ["/content/dam/waters/en/brand-assets/icons/life-buoy.svg"]
    }

    def "get Features list links"() {
        setup:
        def featureList = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Features)

        expect:
        featureList.features.links.stream()
                .map({ l -> l.size() })
                .collect(Collectors.toList()) == size

        where:
        resourcePath                               | size
        "/content/waters/one/jcr:content/features" | [1, 1, 1]
        "/content/waters/two/jcr:content/features" | [2]
    }

}
