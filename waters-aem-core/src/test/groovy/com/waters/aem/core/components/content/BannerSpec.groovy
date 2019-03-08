package com.waters.aem.core.components.content

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class BannerSpec extends AemLibraryModelSpec {

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
        def banner = requestBuilder
            .setPath(path)
            .build()
            .adaptTo(Banner)

        expect:
        banner.backgroundImage?.fileReference == fileReference

        where:
        path                                     | fileReference
        "/content/waters/one/jcr:content/banner" | null
        "/content/waters/two/jcr:content/banner" | "/content/dam/waters/logo.png"
    }
}
