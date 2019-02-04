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
import com.google.common.collect.HashBasedTable;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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

    private com.google.common.collect.Table<Integer, String, String> table;

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
            columnNames.addAll(getTable().row(0).values());
        }

        return columnNames;
    }

    public List<Map<String, String>> getTableRows() {
        return getTable().rowMap().values()
            .stream()
            .skip(header ? 1 : 0)
            .collect(Collectors.toList());
    }

    private com.google.common.collect.Table<Integer, String, String> getTable() {
        if (table == null) {
            table = HashBasedTable.create();

            try (final InputStream excelFileInputStream = getExcelFileInputStream()) {
                if (excelFileInputStream == null) {
                    LOG.warn("excel file is null, returning empty table");
                } else {
                    final Workbook workbook = WorkbookFactory.create(excelFileInputStream);
                    final Sheet sheet = workbook.getSheetAt(0);

                    for (final Row row : sheet) {
                        int cellIndex = 0;

                        for (final Cell cell : row) {
                            final String cellHtml = getCellHtml(workbook, (HSSFCell) cell);

                            table.put(row.getRowNum(), String.valueOf(cellIndex), cellHtml);

                            cellIndex++;
                        }
                    }

                    workbook.close();
                }
            } catch (IOException e) {
                LOG.error("error parsing excel file", e);
            }
        }

        return table;
    }

    private String getCellHtml(final Workbook workbook, final HSSFCell cell) {
        final HSSFFont font = cell.getCellStyle().getFont(workbook);

        String cellHtml;

        switch (cell.getCellType()) {
            case NUMERIC:
                cellHtml = String.valueOf(cell.getNumericCellValue());
                break;
            case STRING:
                cellHtml = cell.getStringCellValue().trim();
                break;
            case BOOLEAN:
                cellHtml = String.valueOf(cell.getBooleanCellValue());
                break;
            default:
                cellHtml = "";
        }

        if (font.getBold()) {
            cellHtml = wrapHtmlTag(cellHtml, "b");
        }

        if (font.getItalic()) {
            cellHtml = wrapHtmlTag(cellHtml, "i");
        }

        if (font.getTypeOffset() == Font.SS_SUB) {
            cellHtml = wrapHtmlTag(cellHtml, "sub");
        }

        if (font.getTypeOffset() == Font.SS_SUPER) {
            cellHtml = wrapHtmlTag(cellHtml, "sup");
        }

        return cellHtml;
    }

    private String wrapHtmlTag(final String text, final String tagName) {
        return new StringBuilder()
            .append("<").append(tagName).append(">")
            .append(text)
            .append("</").append(tagName).append(">")
            .toString();
    }

    private InputStream getExcelFileInputStream() {
        return excelFile == null ? null : excelFile.adaptTo(InputStream.class);
    }
}
