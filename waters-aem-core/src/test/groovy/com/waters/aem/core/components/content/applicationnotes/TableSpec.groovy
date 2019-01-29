package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class TableSpec extends AemLibraryModelSpec {

    private static final String CSV_DATA = """first_name,last_name,email
Cristobal,Lindberg,clindberg0@youku.com
Tommi,Nanuccioi,tnanuccioi1@economist.com
Celene,Mackinder,cmackinder2@economist.com
Lorens,Falconer,lfalconer3@upenn.edu
Alistair,Taggert,ataggert4@behance.net
Ben,Hanlin,bhanlin5@nymag.com
Nissy,Chastney,nchastney6@fda.gov
Zelma,Tiffany,ztiffany7@ftc.gov
Dorie,Fanton,dfanton8@g.co
Crichton,Bruffell,cbruffell9@vimeo.com"""

    def setupSpec() {
        pageBuilder.content {
            waters {
                "jcr:content" {
                    table(csvData: CSV_DATA, header: true, title: "Title", caption: "Caption")
                    "table-no-header"(csvData: CSV_DATA.readLines().tail().join("\n"))
                }
            }
        }
    }

    def "get properties"() {
        setup:
        def table = getResource(path).adaptTo(Table)

        expect:
        table.header == header
        table.title == title
        table.caption == caption

        where:
        path                                          | header | title   | caption
        "/content/waters/jcr:content/table"           | true   | "Title" | "Caption"
        "/content/waters/jcr:content/table-no-header" | false  | null    | null
    }

    def "get column names"() {
        setup:
        def table = getResource(path).adaptTo(Table)

        expect:
        table.columnNames == columnNames

        where:
        path                                          | columnNames
        "/content/waters/jcr:content/table"           | ["first_name", "last_name", "email"] as Set
        "/content/waters/jcr:content/table-no-header" | Collections.emptySet()
    }

    def "get table rows"() {
        setup:
        def table = getResource(path).adaptTo(Table)

        expect:
        table.tableRows.size() == 10

        where:
        path << ["/content/waters/jcr:content/table", "/content/waters/jcr:content/table-no-header"]
    }

    def "get first table row"() {
        setup:
        def table = getResource(path).adaptTo(Table)
        def firstRow = table.tableRows[0]

        expect:
        firstRow.get("0") == "Cristobal"
        firstRow.get("1") == "Lindberg"
        firstRow.get("2") == "clindberg0@youku.com"

        where:
        path << ["/content/waters/jcr:content/table", "/content/waters/jcr:content/table-no-header"]
    }
}
