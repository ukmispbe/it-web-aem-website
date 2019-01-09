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
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

@Component(value = "Table", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Table {

    private static final Logger LOG = LoggerFactory.getLogger(Table.class);

    @DialogField(fieldLabel = "CSV Data")
    @TextArea
    @Inject
    @Default(values = "")
    private String csvData;

    private com.google.common.collect.Table<Integer, String, String> table;

    private CSVParser csvParser;

    public Set<String> getColumnNames() {
        return getCsvParser().getHeaderMap().keySet();
    }

    public Collection<Map<String, String>> getTableRows() {
        return getTable().rowMap().values();
    }

    private CSVParser getCsvParser() {
        if (csvParser == null) {
            try {
                csvParser = CSVParser.parse(csvData, CSVFormat.EXCEL
                    .withFirstRecordAsHeader()
                    .withTrim());
            } catch (IOException e) {
                LOG.error("error parsing CSV data", e);
            }
        }

        return csvParser;
    }

    private com.google.common.collect.Table<Integer, String, String> getTable() {
        if (table == null) {
            table = HashBasedTable.create();

            final Map<String, Integer> headerMap = getCsvParser().getHeaderMap();

            int columnKey = 0;

            try {
                for (final CSVRecord record : getCsvParser().getRecords()) {
                    for (final Map.Entry<String, Integer> entry : headerMap.entrySet()) {
                        final String columnName = entry.getKey();
                        final Integer columnIndex = entry.getValue();

                        final String value = record.get(columnIndex);

                        table.put(columnKey, columnName, value);
                    }

                    columnKey++;
                }
            } catch (IOException e) {
                LOG.error("error getting records from CSV", e);
            }
        }

        return table;
    }
}
