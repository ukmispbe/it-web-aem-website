package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartFile;
import com.citytechinc.cq.component.annotations.widgets.RichTextEditor;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.citytechinc.cq.component.annotations.widgets.ToolbarConfig;
import com.citytechinc.cq.component.annotations.widgets.rte.Format;
import com.citytechinc.cq.component.annotations.widgets.rte.SubSuperscript;
import com.citytechinc.cq.component.annotations.widgets.rte.UISettings;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.ExcelTableParser;
import org.apache.poi.util.IOUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
import java.io.InputStream;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component(value = "Table", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Table {

    @OSGiService
    private ExcelTableParser excelTableParser;

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

    private com.google.common.collect.Table<Integer, String, List<String>> table;

    @DialogField(fieldLabel = "Excel File", ranking = 4)
    @Html5SmartFile(
        fileNameParameter = "./excelFileName",
        fileReferenceParameter = "./excelFile",
        touchUIMimeTypes = {
            "application/vnd.ms-excel"
        })
    @ChildResource
    private Resource excelFile;

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
        final Set<String> columnNames = new LinkedHashSet<>();

        if (header) {
            getTable().row(0).values().forEach(columnNames :: addAll);
        }

        return columnNames;
    }

    public List<Map<String, List<String>>> getTableRows() {
        return getTable().rowMap().values()
            .stream()
            .skip(header ? 1 : 0)
            .collect(Collectors.toList());
    }

    private com.google.common.collect.Table<Integer, String, List<String>> getTable() {
        if (table == null) {
            final InputStream excelFileInputStream = getExcelFileInputStream();

            table = excelTableParser.getTable(excelFileInputStream);

            IOUtils.closeQuietly(excelFileInputStream);
        }

        return table;
    }

    private InputStream getExcelFileInputStream() {
        return excelFile == null ? null : excelFile.adaptTo(InputStream.class);
    }
}
