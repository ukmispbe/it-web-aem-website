package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextArea;
import com.google.common.collect.HashBasedTable;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;

@Component(value = "Table", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Table {

    private static final Logger LOG = LoggerFactory.getLogger(Table.class);

    @DialogField(fieldLabel = "CSV Data")
    @TextArea
    @Inject
    private String csvData;

    public Collection<Map<String, String>> getTableRows() {
        return getTable().rowMap().values();
    }

    public com.google.common.collect.Table<Integer, String, String> getTable() {
        final com.google.common.collect.Table<Integer, String, String> table = HashBasedTable.create();

        if (csvData != null) {
            try {
                final CSVParser parser = CSVParser.parse(csvData, CSVFormat.EXCEL
                    .withFirstRecordAsHeader()
                    .withTrim());

                // TODO determine how to handle header row

                final Map<String, Integer> headerMap = parser.getHeaderMap();

                int columnKey = 0;

                for (final CSVRecord record : parser.getRecords()) {
                    for (final String columnName : headerMap.keySet()) {
                        final Integer columnIndex = headerMap.get(columnName);
                        final String value = record.get(columnIndex);

                        table.put(columnKey, columnName, value);
                    }

                    columnKey++;
                }
            } catch (IOException e) {
                LOG.error("error parsing CSV data", e);
            }
        }

        return table;
    }
}
