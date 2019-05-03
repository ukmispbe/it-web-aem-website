package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class TextSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        text()
                    }
                }
                two {
                    "jcr:content" {
                        text(
                            title: "Introduction",
                            indexed: true
                        )
                    }
                }
            }
        }
    }

    def "get title"() {
        setup:
        def textComponent = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Text)

        expect:
        textComponent.title == title

        where:
        resourcePath                           | title
        "/content/waters/one/jcr:content/text" | null
        "/content/waters/two/jcr:content/text" | "Introduction"
    }

    def "is indexed"() {
        setup:
        def textComponent = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Text)

        expect:
        textComponent.indexed == indexed

        where:
        resourcePath                           | indexed
        "/content/waters/one/jcr:content/text" | false
        "/content/waters/two/jcr:content/text" | true
    }
}
