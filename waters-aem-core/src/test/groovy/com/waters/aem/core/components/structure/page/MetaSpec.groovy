package com.waters.aem.core.components.structure.page

import com.day.cq.commons.Externalizer
import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class MetaSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content"(
                        "jcr:title": "One",
                        "pageTitle": "1",
                        "jcr:description": "First",
                        canonicalUrl: "/waters",
                        noIndex: false,
                        noFollow: false
                    )
                }
                two {
                    "jcr:content"(
                        "jcr:title": "Two",
                        noIndex: false,
                        noFollow: true,
                        ogType: "article",
                        ogImage: "/content/dam/waters/og.png",
                        facebookAppId: "123",
                        twitterPublisherHandle: "@Waters",
                        twitterCard: "summary",
                        twitterImage: "/content/dam/waters/twitter.png"
                    )
                    child() {

                    }
                }
                three {
                    "jcr:content"(
                        noIndex: true,
                        noFollow: false
                    ) {
                        thumbnailImage(fileReference: "/content/dam/waters/logo.png")
                    }
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

    def "get title"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.title == title

        where:
        path                  | title
        "/content/waters/one" | "1"
        "/content/waters/two" | "Two"
    }

    def "get description"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.description == description

        where:
        path                  | description
        "/content/waters/one" | "First"
        "/content/waters/two" | null
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

    def "get externalized page URL"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.externalizedPageUrl == externalizedPageUrl

        where:
        path                  | externalizedPageUrl
        "/content/waters/one" | "http://www.waters.com/content/waters/one.html"
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
        "/content/waters/one"   | ["index", "follow"]
        "/content/waters/two"   | ["index", "nofollow"]
        "/content/waters/three" | ["noindex", "follow"]
        "/content/waters/four"  | ["noindex", "nofollow"]
    }

    def "get og type"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.ogType == ogType

        where:
        path                  | ogType
        "/content/waters/one" | "none"
        "/content/waters/two" | "article"
    }

    def "get inherited og image"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.ogImage == ogImage

        where:
        path                        | ogImage
        "/content/waters/one"       | null
        "/content/waters/two"       | "http://www.waters.com/content/dam/waters/og.png"
        "/content/waters/two/child" | "http://www.waters.com/content/dam/waters/og.png"
        "/content/waters/three"     | "http://www.waters.com/content/dam/waters/logo" +
            ".png/jcr:content/renditions/cq5dam.thumbnail.319.212.png"
    }

    def "get inherited facebook app ID"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.facebookAppId == facebookAppId

        where:
        path                        | facebookAppId
        "/content/waters/one"       | ""
        "/content/waters/two"       | "123"
        "/content/waters/two/child" | "123"
    }

    def "get inherited twitter publisher handle"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.twitterPublisherHandle == twitterPublisherHandle

        where:
        path                        | twitterPublisherHandle
        "/content/waters/one"       | "@WatersCorp"
        "/content/waters/two"       | "@Waters"
        "/content/waters/two/child" | "@Waters"
    }

    def "get twitter card"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.twitterCard == twitterCard

        where:
        path                  | twitterCard
        "/content/waters/one" | "summary_large_image"
        "/content/waters/two" | "summary"
    }

    def "get inherited twitter image"() {
        setup:
        def meta = getPage(path).contentResource.adaptTo(Meta)

        expect:
        meta.twitterImage == twitterImage

        where:
        path                        | twitterImage
        "/content/waters/one"       | null
        "/content/waters/two"       | "http://www.waters.com/content/dam/waters/twitter.png"
        "/content/waters/two/child" | "http://www.waters.com/content/dam/waters/twitter.png"
        "/content/waters/three"     | "http://www.waters.com/content/dam/waters/logo" +
            ".png/jcr:content/renditions/cq5dam.thumbnail.319.212.png"
    }
}
