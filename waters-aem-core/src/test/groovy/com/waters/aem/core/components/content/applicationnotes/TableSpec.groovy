package com.waters.aem.core.components.content.applicationnotes

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.processor.TablePostProcessor
import com.waters.aem.core.services.ExcelTableParser
import com.waters.aem.core.services.impl.POIExcelTableParser
import spock.lang.Shared
import spock.lang.Unroll

@Unroll
class TableSpec extends AemLibraryModelSpec {

    @Shared
    TablePostProcessor processor

    def setupSpec() {
        slingContext.registerService(ExcelTableParser, new POIExcelTableParser())

        processor = slingContext.registerInjectActivateService(new TablePostProcessor())
    }

    def "get properties"() {
        setup:
        def request = requestBuilder.build {
            path = resourcePath
        }

        // post-process to set JSON data
        processor.process(request, [])

        def table = request.adaptTo(Table)

        expect:
        table.header == header
        table.title == title
        table.caption == caption

        where:
        resourcePath                                          | header | title               | caption
        "/content/waters/table/jcr:content/table-with-header" | true   | "Table With Header" | "Caption"
        "/content/waters/table/jcr:content/table-no-header"   | false  | null                | null
    }

    def "get column names"() {
        setup:
        def request = requestBuilder.build {
            path = resourcePath
        }

        // post-process to set JSON data
        processor.process(request, [])

        def table = request.adaptTo(Table)

        expect:
        table.columnNames == columnNames

        where:
        resourcePath                                          | columnNames
        "/content/waters/table/jcr:content/table-with-header" | ["One", "Two"] as Set
        "/content/waters/table/jcr:content/table-no-header"   | Collections.emptySet()
    }

    def "get table rows"() {
        setup:
        def request = requestBuilder.build {
            path = resourcePath
        }

        // post-process to set JSON data
        processor.process(request, [])

        def table = request.adaptTo(Table)

        expect:
        table.tableRows.size() == 4

        where:
        resourcePath << [
            "/content/waters/table/jcr:content/table-with-header",
            "/content/waters/table/jcr:content/table-no-header"
        ]
    }

    def "get first table row"() {
        setup:
        def request = requestBuilder.build {
            path = resourcePath
        }

        // post-process to set JSON data
        processor.process(request, [])

        def table = request.adaptTo(Table)

        def firstRow = table.tableRows[0]

        expect:
        firstRow.get("0")[0] == "LC system:"
        firstRow.get("1")[0] == " ACQUITY UPLC H-Class Bio"

        where:
        resourcePath << [
            "/content/waters/table/jcr:content/table-with-header",
            "/content/waters/table/jcr:content/table-no-header"
        ]
    }
}
