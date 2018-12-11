package com.waters.aem.core.components.content

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class TextSpec extends AemLibraryModelSpec {

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
                               text: "Lorem ipsum dolor sit amet, quo ad nihil vituperatoribus." )
                    }
                }
            }
        }
    }

    def "get title"() {
        setup:
        def textComponent = requestBuilder.setPath(path).build().adaptTo(Text)

        expect:
        textComponent.title == title

        where:
        path                                   | title
        "/content/waters/one/jcr:content/text" | null
        "/content/waters/two/jcr:content/text" | "Introduction"
    }


}
