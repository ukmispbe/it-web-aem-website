package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class MethodFileButtonSpec extends AemLibraryModelSpec {

    def setupSpec() {
        nodeBuilder.content {
            dam {
                waters {
                    "app-notes" {
                        "2019" {
                            "123" {
                                method {
                                    "method-file.zip"("dam:Asset")
                                    "method-file.exe"("dam:Asset")
                                }
                            }
                            "456" {
                                method()
                            }
                            "789" {

                            }
                        }
                    }
                }
            }
        }

        nodeBuilder.etc {
            tags("sling:Folder") {
                waters("cq:Tag") {
                    yearPublished() {
                        "2018"("cq:Tag", "jcr:title": "2018")
                        "2019"("cq:Tag", "jcr:title": "2019")
                    }
                }
            }
        }

        pageBuilder.content {
            waters {
                one {
                    "jcr:content"(literatureCode: "123", yearPublished: ["/etc/tags/waters/yearPublished/2019"])
                }
                two {
                    "jcr:content"(yearPublished: ["/etc/tags/waters/yearPublished/2019"])
                }
                three {
                    "jcr:content"(literatureCode: "123")
                }
                four {
                    "jcr:content"(literatureCode: "123", yearPublished: ["/etc/tags/waters/yearPublished/2018"])
                }
                five {
                    "jcr:content"(literatureCode: "456", yearPublished: ["/etc/tags/waters/yearPublished/2019"])
                }
                six {
                    "jcr:content"(literatureCode: "789", yearPublished: ["/etc/tags/waters/yearPublished/2019"])
                }
            }
        }
    }

    def "get method file path"() {
        setup:
        def methodFileButton = requestBuilder.build {
            path = resourcePath
        }.adaptTo(MethodFileButton)

        expect:
        methodFileButton.methodFilePath == methodFilePath

        where:
        resourcePath            | methodFilePath
        "/content/waters/one"   | "/content/dam/waters/app-notes/2019/123/method/method-file.zip"
        "/content/waters/two"   | null
        "/content/waters/three" | null
        "/content/waters/four"  | null
        "/content/waters/five"  | null
        "/content/waters/six"   | null
    }
}
