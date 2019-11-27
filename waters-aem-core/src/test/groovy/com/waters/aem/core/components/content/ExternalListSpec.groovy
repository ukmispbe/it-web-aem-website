package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class ExternalListSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        externallist()
                    }
                }
                two {
                    "jcr:content" {
                        externallist (
                                title: "Test Title",
                                description: "Test description for the external list",
                                text: "Test link text",
                                link: "/content/waters/us/en",
                        )
                    }
                }
                three {
                    "jcr:content" {
                        externallist (
                                title: "Test Title",
                                description: "Test description for the external list",
                                text: "Test link text",
                                link: "https://www.google.com/",
                        )
                    }
                }
            }
        }
    }

    def "get external list title"() {
        setup:
        def externallist = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalList)

        expect:
        externallist.title == title

        where:
        resourcePath                                   | title
        "/content/waters/one/jcr:content/externallist" | null
        "/content/waters/two/jcr:content/externallist" | "Test Title"
    }

    def "get external list description"() {
        setup:
        def externallist = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalList)

        expect:
        externallist.description == description

        where:
        resourcePath                                   | description
        "/content/waters/one/jcr:content/externallist" | null
        "/content/waters/two/jcr:content/externallist" | "Test description for the external list"
    }

    def "get external list link text"() {
        setup:
        def externallist = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalList)

        expect:
        externallist.text == text

        where:
        resourcePath                                   | text
        "/content/waters/one/jcr:content/externallist" | null
        "/content/waters/two/jcr:content/externallist" | "Test link text"
    }

    def "get external list link href"() {
        setup:
        def externallist = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalList)

        expect:
        externallist.link.href == href

        where:
        resourcePath                                     | href
        "/content/waters/two/jcr:content/externallist"   | "/content/waters/us/en.html"
        "/content/waters/three/jcr:content/externallist" | "https://www.google.com/"
    }

    def "get external list is external"() {
        setup:
        def externallist = requestBuilder.build {
            path = resourcePath
        }.adaptTo(ExternalList)

        expect:
        externallist.isExternal() == href

        where:
        resourcePath                                     | href
        "/content/waters/two/jcr:content/externallist"   | false
        "/content/waters/three/jcr:content/externallist" | true
    }

}
