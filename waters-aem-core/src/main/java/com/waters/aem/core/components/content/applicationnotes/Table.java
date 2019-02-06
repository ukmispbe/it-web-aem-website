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
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
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
            table = HashBasedTable.create();

            try (final InputStream excelFileInputStream = getExcelFileInputStream()) {
                if (excelFileInputStream == null) {
                    LOG.warn("excel file is null, returning empty table");
                } else {
                    final HSSFWorkbook workbook = (HSSFWorkbook) WorkbookFactory.create(excelFileInputStream);
                    final HSSFSheet sheet = workbook.getSheetAt(0);

                    for (final Row row : sheet) {
                        int cellIndex = 0;

                        for (final Cell cell : row) {
                            final List<String> cellHtml = getCellHtml(workbook, (HSSFCell) cell);

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

    private List<String> getCellHtml(final HSSFWorkbook workbook, final HSSFCell cell) {
        final HSSFFont font = cell.getCellStyle().getFont(workbook);

        List<String> values;

        switch (cell.getCellType()) {
            case NUMERIC:
                values = getCellValues(String.valueOf(cell.getNumericCellValue()), font);
                break;
            case STRING:
                values = getRichTextCellValues(workbook, cell);
                break;
            case BOOLEAN:
                values = getCellValues(String.valueOf(cell.getBooleanCellValue()), font);
                break;
            default:
                values = Collections.emptyList();
        }

        return values;
    }

    private List<String> getRichTextCellValues(final HSSFWorkbook workbook, final HSSFCell cell) {
        final HSSFRichTextString richStringCellValue = cell.getRichStringCellValue();
        final String value = richStringCellValue.getString();

        final Scanner scanner = new Scanner(value);

        final List<String> lines = new ArrayList<>();

        int startIndex = 0;

        HSSFFont font = workbook.getFontAt((int) richStringCellValue.getFontAtIndex(0));

        while (scanner.hasNextLine()) {
            String html = scanner.nextLine();

            final int lineLength = html.length();

            final StringBuilder line = new StringBuilder();
            final StringBuilder run = new StringBuilder();

            for (int i = startIndex; i < startIndex + lineLength; i++) {
                final HSSFFont currentFont = workbook.getFontAt((int) richStringCellValue.getFontAtIndex(i));

                if (!font.equals(currentFont)) {
                    // font changed, terminate run for previous font
                    if (run.length() > 0) {
                        line.append(getHtmlValue(run.toString(), font));

                        // reset builder
                        run.setLength(0);
                    }

                    font = currentFont;
                }

                run.append(value.charAt(i));
            }

            // append final segment
            line.append(getHtmlValue(run.toString(), font));

            // append line
            lines.add(line.toString());

            // increment start index
            startIndex += lineLength + 1;
        }

        return lines;
    }

    private List<String> getCellValues(final String value, final HSSFFont font) {
        return Collections.singletonList(getHtmlValue(value, font));
    }

    private String getHtmlValue(final String value, final HSSFFont font) {
        String html = value;

        if (font.getBold()) {
            html = wrapHtmlTag(html, "b");
        }

        if (font.getItalic()) {
            html = wrapHtmlTag(html, "i");
        }

        if (font.getTypeOffset() == Font.SS_SUB) {
            html = wrapHtmlTag(html, "sub");
        }

        if (font.getTypeOffset() == Font.SS_SUPER) {
            html = wrapHtmlTag(html, "sup");
        }

        return html;
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
