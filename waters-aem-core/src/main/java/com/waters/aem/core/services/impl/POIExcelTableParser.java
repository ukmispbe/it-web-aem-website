package com.waters.aem.core.services.impl;

import com.google.common.collect.HashBasedTable;
import com.google.common.collect.Table;
import com.waters.aem.core.services.ExcelTableParser;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

@Component(service = ExcelTableParser.class)
public final class POIExcelTableParser implements ExcelTableParser {

    private static final Logger LOG = LoggerFactory.getLogger(POIExcelTableParser.class);

    @Override
    public Table<Integer, String, List<String>> getTable(final InputStream excelFileInputStream) {
        final Table<Integer, String, List<String>> table = HashBasedTable.create();

        if (excelFileInputStream == null) {
            LOG.warn("excel file is null, returning empty table");
        } else {
            try {
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
            } catch (IOException e) {
                LOG.error("error parsing excel file, returning empty table", e);
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
                values = getRichTextCellValues(workbook, cell, font);
                break;
            case BOOLEAN:
                values = getCellValues(String.valueOf(cell.getBooleanCellValue()), font);
                break;
            default:
                values = Collections.emptyList();
        }

        return values;
    }

    private List<String> getRichTextCellValues(final HSSFWorkbook workbook, final HSSFCell cell,
        final HSSFFont cellFont) {
        final HSSFRichTextString richStringCellValue = cell.getRichStringCellValue();
        final String value = richStringCellValue.getString();

        final Scanner scanner = new Scanner(value);

        final List<String> lines = new ArrayList<>();

        int startIndex = 0;

        HSSFFont font = getFont(workbook, cell, cellFont, startIndex);

        while (scanner.hasNextLine()) {
            String html = scanner.nextLine();

            final int lineLength = html.length();

            final StringBuilder line = new StringBuilder();
            final StringBuilder run = new StringBuilder();

            for (int i = startIndex; i < startIndex + lineLength; i++) {
                final HSSFFont currentFont = getFont(workbook, cell, cellFont, i);

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

    private HSSFFont getFont(final HSSFWorkbook workbook, final HSSFCell cell, final HSSFFont cellFont,
        final int index) {
        final HSSFRichTextString richStringCellValue = cell.getRichStringCellValue();

        final HSSFFont font;

        if (richStringCellValue.numFormattingRuns() > 0) {
            font = workbook.getFontAt((int) richStringCellValue.getFontAtIndex(index));
        } else {
            font = cellFont;
        }

        return font;
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
}
