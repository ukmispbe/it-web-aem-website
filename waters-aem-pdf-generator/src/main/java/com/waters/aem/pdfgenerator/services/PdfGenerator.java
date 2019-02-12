package com.waters.aem.pdfgenerator.services;

import com.day.cq.dam.api.Asset;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.resource.PersistenceException;

import java.io.IOException;
import java.io.OutputStream;

public interface PdfGenerator {

    /**
     * Generate a PDF document from the HTML markup of the current page.
     *
     * @param page application notes page
     * @return output stream
     * @throws IOException if error occurs in PDF generation
     */
    OutputStream generatePdfDocumentFromHtml(PageDecorator page) throws IOException;

    /**
     * Generate a PDF document from the HTML markup of the current page.
     *
     * @param page application notes page
     * @param force if true, force regeneration of the PDF asset even if it already exists
     * @return DAM asset
     * @throws IOException if error occurs in PDF generation
     */
    Asset generatePdfDocumentFromHtml(PageDecorator page, boolean force) throws IOException;

    /**
     * Delete the PDF asset corresponding to the given page.
     *
     * @param page application notes page
     */
    void deletePdfDocument(PageDecorator page) throws PersistenceException;
}
