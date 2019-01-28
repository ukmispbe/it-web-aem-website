package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextArea;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.google.common.collect.HashBasedTable;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.stream.IntStream;

@Component(value = "Table", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Table {

    private static final Logger LOG = LoggerFactory.getLogger(Table.class);

    @DialogField(fieldLabel = "Title", ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Caption", ranking = 2)
    @TextField
    @Inject
    private String caption;

    @DialogField(fieldLabel = "Has Header?",
        fieldDescription = "Select 'Yes' if the first row in the CSV data is a header.",
        ranking = 3)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private boolean hasHeader;

    @DialogField(fieldLabel = "CSV Data", ranking = 4)
    @TextArea
    @Inject
    @Default(values = "")
    private String csvData;

    private com.google.common.collect.Table<Integer, String, String> table;

    private CSVParser csvParser;

    public String getTitle() {
        return title;
    }

    public String getCaption() {
        return caption;
    }

    public boolean isHasHeader() {
        return hasHeader;
    }

    public Set<String> getColumnNames() {
        return getCsvParser().getHeaderMap() == null ? Collections.emptySet() : getCsvParser().getHeaderMap().keySet();
    }

    public Collection<Map<String, String>> getTableRows() {
        return getTable().rowMap().values();
    }

    private CSVParser getCsvParser() {
        if (csvParser == null) {
            try {
                final CSVFormat format = hasHeader ? CSVFormat.EXCEL.withFirstRecordAsHeader() : CSVFormat.EXCEL;

                csvParser = CSVParser.parse(csvData, format.withTrim());
            } catch (IOException e) {
                LOG.error("error parsing CSV data", e);
            }
        }

        return csvParser;
    }

    private com.google.common.collect.Table<Integer, String, String> getTable() {
        if (table == null) {
            table = HashBasedTable.create();

            try {
                getCsvParser().getRecords().forEach(record -> IntStream.range(0, record.size()).forEach(columnIndex -> {
                    final String value = record.get(columnIndex);

                    table.put(Math.toIntExact(record.getRecordNumber()), String.valueOf(columnIndex), value);
                }));
            } catch (IOException e) {
                LOG.error("error getting records from CSV", e);
            }
        }

        return table;
    }
}
