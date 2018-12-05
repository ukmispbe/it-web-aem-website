package com.waters.aem.core.components.content

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.TagCloud
import spock.lang.Unroll

@Unroll
class TagCloudSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                appnotes {
                    "jcr:content" {
                        tagcloud()
                    }
                }
                appnotesacquity {
                    "jcr:content" {
                        tagcloud(
                            title: "Tags",
                            tagPicker: "waters:keywords/FoodSafety,waters:keywords/NaturalToxins"
                        )
                    }
                }
            }
        }
    }

    def "get tagcloud title"() {
        setup:
        def tagcloud = getResource(path).adaptTo(TagCloud)

        expect:
        tagcloud.title == title

        where:
        path                                     | title
        "/content/waters/appnotes/jcr:content/tagcloud" | null
        "/content/waters/appnotesacquity/jcr:content/tagcloud" | "Tags"
    }

    def "get tagcloud tagpicker"() {
        setup:
        def tagcloud = getResource(path).adaptTo(TagCloud)

        expect:
        tagcloud.tagPicker == tagPicker

        where:
        path                                     | tagPicker
        "/content/waters/appnotes/jcr:content/tagcloud" | null
        "/content/waters/appnotesacquity/jcr:content/tagcloud" | "waters:keywords/FoodSafety,waters:keywords/NaturalToxins"
    }

}
