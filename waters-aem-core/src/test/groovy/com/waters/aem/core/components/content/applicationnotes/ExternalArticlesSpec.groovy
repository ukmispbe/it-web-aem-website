package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.TagCloud
import spock.lang.Unroll

@Unroll
class ExternalArticlesSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        externalarticles {
                            linkItems{
                                item1(link: "www.waters.com" , text: "waters")
                                item2(link: "www.ta.com" , text: "ta")
                            }
                        }
                    }
                }
            }
        }
    }

    def "get externalarticle links"() {
        setup:
        def externalarticles = getResource("/content/waters/one/jcr:content/externalarticles").adaptTo(ExternalArticles)

        expect:
        externalarticles.linkItems.size() == 2

        and:
        externalarticles.linkItems.text == ["waters", "ta"]

        and:
        externalarticles.linkItems.link.href == ["www.waters.com", "www.ta.com"]
    }
}
