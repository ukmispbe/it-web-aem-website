package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec

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
                    table(csvData: CSV_DATA)
                }
            }
        }
    }

    def "get column names"() {
        setup:
        def table = getResource("/content/waters/jcr:content/table").adaptTo(Table)

        expect:
        table.columnNames == ["first_name", "last_name", "email"] as Set
    }

    def "get table rows"() {
        setup:
        def table = getResource("/content/waters/jcr:content/table").adaptTo(Table)

        expect:
        table.tableRows.size() == 10
    }

    def "get first table row"() {
        setup:
        def table = getResource("/content/waters/jcr:content/table").adaptTo(Table)
        def firstRow = table.tableRows[0]

        expect:
        firstRow.get("first_name") == "Cristobal"
        firstRow.get("last_name") == "Lindberg"
        firstRow.get("email") == "clindberg0@youku.com"
    }
}
