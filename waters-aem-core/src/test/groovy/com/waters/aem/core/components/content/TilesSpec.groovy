package com.waters.aem.core.components.content

import com.waters.aem.core.WatersSpec
import spock.lang.Unroll

@Unroll
class TilesSpec extends WatersSpec{

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        tiles {
                            tiles {
                                item1(title: "Download Users Manual", icon: "/content/dam/waters/brand-assets/icons/close.svg", link: "www.waters.com")
                                item2(title: "Request Certificate of Analysis", icon: "/content/dam/waters/brand-assets/icons/attention.svg", link: "www.test.com")
                            }
                        }
                    }
                }
            }
        }
    }

    def "get Tiles list"() {
        setup:
        def tileList = requestBuilder.build {
            path = "/content/waters/one/jcr:content/tiles"
        }.adaptTo(Tiles)

        expect:
        tileList.tiles.size() == 2

        and:
        tileList.tiles.title == ["Download Users Manual", "Request Certificate of Analysis"]

        and:
        tileList.tiles.link.href == ["www.waters.com", "www.test.com"]
    }

}
