package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class ButtonSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        button()
                    }
                }
                two {
                    "jcr:content" {
                        button(
                            buttonText: "Waters",
                            buttonToolTip: "Waters ToolTip",
                            buttonLink: "/content/waters",
                            newWindow: true
                        )
                    }
                }
            }
        }
    }

    def "get button text"() {
        setup:
        def button = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Button)

        expect:
        button.buttonText == text

        where:
        resourcePath                             | text
        "/content/waters/one/jcr:content/button" | null
        "/content/waters/two/jcr:content/button" | "Waters"
    }

    def "get button tooltip"() {
        setup:
        def button = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Button)

        expect:
        button.buttonToolTip == toolTip

        where:
        resourcePath                             | toolTip
        "/content/waters/one/jcr:content/button" | null
        "/content/waters/two/jcr:content/button" | "Waters ToolTip"
    }

    def "button link is null when no values are authored"() {
        setup:
        def button = requestBuilder.build {
            path = "/content/waters/one/jcr:content/button"
        }.adaptTo(Button)

        expect:
        button.buttonLink == null
    }

    def "get button link"() {
        setup:
        def button = requestBuilder.build {
            path = "/content/waters/two/jcr:content/button"
        }.adaptTo(Button)

        expect:
        button.buttonLink // groovy truth check for non-null

        and:
        button.buttonLink.href == "/content/waters.html"
    }

    def "is open in new window?"() {
        setup:
        def button = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Button)

        expect:
        button.newWindow == isNewWindow

        where:
        resourcePath                             | isNewWindow
        "/content/waters/one/jcr:content/button" | false
        "/content/waters/two/jcr:content/button" | true
    }
}
