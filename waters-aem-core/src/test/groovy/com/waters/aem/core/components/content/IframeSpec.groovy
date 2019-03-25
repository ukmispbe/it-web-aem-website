package com.waters.aem.core.components.content

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class IframeSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        iframe()
                    }
                }
                two {
                    "jcr:content" {
                        iframe(
                                source: "/content/dam/waters/pdf-test/test-pdf.pdf"
                        )
                    }
                }
            }
        }
    }

    def "get iframe source"() {
        setup:
        def iframe = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Iframe)

        expect:
        iframe.source == source

        where:
        resourcePath                             | source
        "/content/waters/one/jcr:content/iframe" | null
        "/content/waters/two/jcr:content/iframe" | "/content/dam/waters/pdf-test/test-pdf.pdf"
    }
}
