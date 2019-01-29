package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.RichTextEditor;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextArea;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.citytechinc.cq.component.annotations.widgets.ToolbarConfig;
import com.citytechinc.cq.component.annotations.widgets.rte.Format;
import com.citytechinc.cq.component.annotations.widgets.rte.SubSuperscript;
import com.citytechinc.cq.component.annotations.widgets.rte.UISettings;
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
    @RichTextEditor(
        format = @Format(underline = false),
        subsuperscript = @SubSuperscript,
        uiSettings = @UISettings(
            inline = @ToolbarConfig(toolbars = {
                ToolbarConfig.FORMAT_BOLD,
                ToolbarConfig.FORMAT_ITALIC,
                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT
            }),
            fullscreen = @ToolbarConfig(toolbars = {
                ToolbarConfig.FORMAT_BOLD,
                ToolbarConfig.FORMAT_ITALIC,
                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT
            })
        )
    )
    @Inject
    private String caption;

    @DialogField(fieldLabel = "Table Header",
        fieldDescription = "Select this option to specify if the CSV has a header row.",
        ranking = 3)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private boolean header;

    @DialogField(fieldLabel = "CSV Data", ranking = 4, required = true)
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

    public boolean isHeader() {
        return header;
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
                final CSVFormat format = header ? CSVFormat.EXCEL.withFirstRecordAsHeader() : CSVFormat.EXCEL;

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
