package com.waters.aem.core.services;

import com.google.common.collect.Table;

import java.io.InputStream;
import java.util.List;

/**
 * Excel file parser to convert a spreadsheet into a table.
 */
public interface ExcelTableParser {

    /**
     * Get the table representing the values in the first sheet of the Excel file workbook.
     *
     * @param excelFileInputStream Excel file stream
     * @return table
     */
    Table<Integer, String, List<String>> getTable(InputStream excelFileInputStream);
}
