package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class BannerSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        banner()
                    }
                }
                two {
                    "jcr:content" {
                        banner() {
                            backgroundImage(fileReference: "/content/dam/waters/logo.png")
                        }
                    }
                }
            }
        }
    }

    def "get background image"() {
        setup:
        def banner = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Banner)

        expect:
        banner.backgroundImage?.fileReference == fileReference

        where:
        resourcePath                             | fileReference
        "/content/waters/one/jcr:content/banner" | null
        "/content/waters/two/jcr:content/banner" | "/content/dam/waters/logo.png"
    }
}
