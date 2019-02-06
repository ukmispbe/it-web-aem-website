package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import spock.lang.Unroll

@Unroll
class TableSpec extends AemLibraryModelSpec {

    def "get properties"() {
        setup:
        def table = getResource(path).adaptTo(Table)

        expect:
        table.header == header
        table.title == title
        table.caption == caption

        where:
        path                                                  | header | title               | caption
        "/content/waters/table/jcr:content/table-with-header" | true   | "Table With Header" | "Caption"
        "/content/waters/table/jcr:content/table-no-header"   | false  | null                | null
    }

    def "get column names"() {
        setup:
        def table = getResource(path).adaptTo(Table)

        expect:
        table.columnNames == columnNames

        where:
        path                                                  | columnNames
        "/content/waters/table/jcr:content/table-with-header" | ["One", "Two"] as Set
        "/content/waters/table/jcr:content/table-no-header"   | Collections.emptySet()
    }

    def "get table rows"() {
        setup:
        def table = getResource(path).adaptTo(Table)

        expect:
        table.tableRows.size() == 4

        where:
        path << [
            "/content/waters/table/jcr:content/table-with-header",
            "/content/waters/table/jcr:content/table-no-header"
        ]
    }

    def "get first table row"() {
        setup:
        def table = getResource(path).adaptTo(Table)
        def firstRow = table.tableRows[0]

        expect:
        firstRow.get("0")[0] == "LC system:"
        firstRow.get("1")[0] == " ACQUITY UPLC H-Class Bio"

        where:
        path << [
            "/content/waters/table/jcr:content/table-with-header",
            "/content/waters/table/jcr:content/table-no-header"
        ]
    }
}
