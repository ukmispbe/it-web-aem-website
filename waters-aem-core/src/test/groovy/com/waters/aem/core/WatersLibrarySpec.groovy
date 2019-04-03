package com.waters.aem.core

abstract class WatersLibrarySpec extends WatersSpec {

    def setupSpec() {
        nodeBuilder.content {
            dam("sling:Folder") {
                waters("sling:Folder") {
                    library("sling:Folder") {
                        "asset.pdf"("dam:Asset") {
                            "jcr:content"("dam:AssetContent") {
                                metadata(
                                    "category": ["waters:category/library"],
                                    "contentType": ["waters:contenttype/applicationnotes"],
                                    "dc:language": "en",
                                    "dc:description": "Library Asset Description",
                                    "dc:title": "Library Asset",
                                    "literatureCode": "123",
                                    "market": ["waters:market/test"],
                                    "product": ["waters:product/test"],
                                    "technique": ["waters:technique/test"],
                                    "instrumentType": ["waters:instrumenttype/test"],
                                    "event": ["waters:event/test"],
                                    "separationMode": ["waters:separationmode/test"],
                                    "monthPublished": ["waters:month/june"],
                                    "yearPublished": ["waters:year/2019"]
                                )
                            }
                        }
                    }
                }
            }
        }

        nodeBuilder.etc {
            tags("sling:Folder") {
                waters("cq:Tag") {
                    category("cq:Tag") {
                        library("cq:Tag", "jcr:title": "Library")
                    }
                    contenttype("cq:Tag") {
                        applicationnotes("cq:Tag", "jcr:title": "Application Notes")
                    }
                    market("cq:Tag") {
                        test("cq:Tag", "jcr:title": "Test")
                    }
                    product("cq:Tag") {
                        test("cq:Tag", "jcr:title": "Test")
                    }
                    event("cq:Tag") {
                        test("cq:Tag", "jcr:title": "Test")
                    }
                    separationmode("cq:Tag") {
                        test("cq:Tag", "jcr:title": "Test")
                    }
                    technique("cq:Tag") {
                        test("cq:Tag", "jcr:title": "Test")
                    }
                    instrumenttype("cq:Tag") {
                        test("cq:Tag", "jcr:title": "Test")
                    }
                    month("cq:Tag") {
                        june("cq:Tag", "jcr:title": "June")
                    }
                    year("cq:Tag") {
                        "2019"("cq:Tag", "jcr:title": "2019")
                    }
                }
            }
        }
    }
}
