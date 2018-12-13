package com.waters.aem.core.components.structure.page

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec

class ThumbnailSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                "application-notes"() {
                    "jcr:content" {
                        thumbnailImage(fileReference: "/content/dam/waters/logo.png")
                    }
                }
            }
        }
    }

    def "no thumbnail image"() {
        setup:
        def thumbnail = getPage("/content/waters").contentResource.adaptTo(Thumbnail)

        expect:
        thumbnail.thumbnailImage == null
    }

    def "get thumbnail image"() {
        setup:
        def thumbnail = getPage("/content/waters/application-notes").contentResource.adaptTo(Thumbnail)

        expect:
        thumbnail.thumbnailImage

        and:
        thumbnail.thumbnailImage.fileReference == "/content/dam/waters/logo.png"
    }
}
