package com.waters.aem.core.components.structure

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class FooterSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "jcr:content"() {
                    footer(copyrightText: "Copyright Test")
                }
                level1 {
                    "jcr:content"() {
                        footer()
                    }
                    level2 {
                        "jcr:content"() {
                            footer()
                        }
                    }
                }
            }
            test {
                "jcr:content"() {
                    footer()
                }
            }
        }
    }

    def "copyright text is inherited from root page"() {
        setup:
        def footer = getResource(path).adaptTo(Footer)

        expect:
        footer.copyrightText == "Copyright Test"

        where:
        path << [
            "/content/waters/jcr:content/footer",
            "/content/waters/level1/jcr:content/footer",
            "/content/waters/level1/level2/jcr:content/footer"
        ]
    }

    def "copyright text returns default value"() {
        setup:
        def footer = getResource("/content/test/jcr:content/footer").adaptTo(Footer)
        def year = Calendar.instance.get(Calendar.YEAR)

        expect:
        footer.copyrightText == "© $year Waters.  All rights reserved."
    }
}
