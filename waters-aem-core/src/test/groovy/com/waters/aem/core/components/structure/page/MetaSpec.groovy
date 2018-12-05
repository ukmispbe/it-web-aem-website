package com.waters.aem.core.components.structure.page

import com.day.cq.commons.Externalizer
import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class MetaSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content"(
                        canonicalUrl: "/waters",
                        noIndex: false,
                        noFollow: false
                    )
                }
                two {
                    "jcr:content"(
                        noIndex: false,
                        noFollow: true
                    )
                }
                three {
                    "jcr:content"(
                        noIndex: true,
                        noFollow: false
                    )
                }
                four {
                    "jcr:content"(
                        noIndex: true,
                        noFollow: true
                    )
                }
            }
        }

        slingContext.registerService(Externalizer, new MockExternalizer())
    }

    def "get canonical URL"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.canonicalUrl == canonicalUrl

        where:
        path                  | canonicalUrl
        "/content/waters/one" | "http://www.waters.com/waters.html"
        "/content/waters/two" | "http://www.waters.com/content/waters/two.html"
    }

    def "no index"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.noIndex == isNoIndex

        where:
        path                    | isNoIndex
        "/content/waters/one"   | false
        "/content/waters/two"   | false
        "/content/waters/three" | true
        "/content/waters/four"  | true
    }

    def "no follow"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.noFollow == isNoFollow

        where:
        path                    | isNoFollow
        "/content/waters/one"   | false
        "/content/waters/two"   | true
        "/content/waters/three" | false
        "/content/waters/four"  | true
    }

    def "get robots tags"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.robotsTags == tags

        where:
        path                    | tags
        "/content/waters/one"   | []
        "/content/waters/two"   | ["NOFOLLOW"]
        "/content/waters/three" | ["NOINDEX"]
        "/content/waters/four"  | ["NOINDEX", "NOFOLLOW"]
    }
}
