package com.waters.aem.core.components.content.applicationnotes.processor

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.components.content.applicationnotes.Table
import com.waters.aem.core.services.ExcelTableParser
import com.waters.aem.core.services.impl.POIExcelTableParser
import spock.lang.Shared
import spock.lang.Unroll

@Unroll
class TablePostProcessorSpec extends AemLibraryModelSpec {

    @Shared
    TablePostProcessor processor

    def setupSpec() {
        slingContext.registerService(ExcelTableParser, new POIExcelTableParser())
        slingContext.addModelsForClasses(Table)

        processor = slingContext.registerInjectActivateService(new TablePostProcessor())
    }

    def "persist empty list JSON when table excel file is null"() {
        setup:
        def resourcePath = "/content/waters/table/jcr:content/table-empty"

        def request = requestBuilder.build {
            path = resourcePath
        }

        when:
        processor.process(request, [])

        then:
        getResource(resourcePath).valueMap.get(Table.PROPERTY_TABLE_ROWS_JSON, "") == "[]"
    }

    def "persist JSON for table excel file"() {
        setup:
        def request = requestBuilder.build {
            path = resourcePath
        }

        when:
        processor.process(request, [])

        then:
        getResource(resourcePath).valueMap.get(Table.PROPERTY_TABLE_ROWS_JSON, "") == json

        where:
        resourcePath                                          | json
        "/content/waters/table/jcr:content/table-with-header" | "[{\"0\":[\"One\"],\"1\":[\"Two\"]},{\"0\":[\"LC " +
            "system:\"],\"1\":[\" ACQUITY UPLC H-Class Bio\"]},{\"0\":[\"Detection:\"],\"1\":[\" ACQUITY UPLC TUV " +
            "Detector with 5 mm titanium flow cell\"]},{\"0\":[\"Wavelength:\"],\"1\":[\" 214 nm\"]}," +
            "{\"0\":[\"Columns:\"],\"1\":[\" ACQUITY UPLC Peptide BEH C18, 130., 1.7 µm, 2.1 x 150 mm (p/n  " +
            "186003556)\"]}]"
        "/content/waters/table/jcr:content/table-no-header"   | "[{\"0\":[\"LC system:\"]," +
            "\"1\":[\" ACQUITY UPLC H-Class Bio\"]},{\"0\":[\"Detection:\"],\"1\":[\" ACQUITY UPLC TUV Detector with " +
            "5 mm titanium flow cell\"]},{\"0\":[\"Wavelength:\"],\"1\":[\" 214 nm\"]},{\"0\":[\"Columns:\"]," +
            "\"1\":[\" ACQUITY UPLC Peptide BEH C18, 130., 1.7 µm, 2.1 x 150 mm (p/n  186003556)\"]}]"

    }
}
