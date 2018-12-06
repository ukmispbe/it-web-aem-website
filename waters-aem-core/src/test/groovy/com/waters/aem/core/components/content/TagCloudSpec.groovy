package com.waters.aem.core.components.content

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.TagCloud
import spock.lang.Unroll

@Unroll
class TagCloudSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        tagcloud()
                    }
                }
                two {
                    "jcr:content" {
                        tagcloud(
                                title: "Waters Tags",
                                tagPicker: ["/etc/tags/waters/tag1", "/etc/tags/waters/tag2"]
                        )
                    }
                }
            }
        }
        nodeBuilder.etc {
            tags("sling:Folder") {
                waters("sling:Folder") {
                    tag1("cq:Tag", "jcr:title": "uplc")
                    tag2("cq:Tag", "jcr:title": "hplc")
                }
            }
        }
    }

    def "get tagcloud title"() {
        setup:
        def tagCloud = getResource(path).adaptTo(TagCloud)

        expect:
        tagCloud.title == text

        where:
        path                                     | text
        "/content/waters/one/jcr:content/tagcloud" | null
        "/content/waters/two/jcr:content/tagcloud" | "Waters Tags"
    }

    def "get tagcloud tagpicker"() {
        setup:
            def tagCloud = getResource("/content/waters/two/jcr:content/tagcloud").adaptTo(TagCloud)

        expect:
        tagCloud.tagPicker.size() == 2

        and:
        tagCloud.tagPicker.title == ["uplc", "hplc"]
    }
}
