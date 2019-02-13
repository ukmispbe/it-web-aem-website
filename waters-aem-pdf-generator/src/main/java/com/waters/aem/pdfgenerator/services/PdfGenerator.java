package com.waters.aem.pdfgenerator.services;

import com.day.cq.dam.api.Asset;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.resource.PersistenceException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface PdfGenerator {

    /**
     * Generate a PDF document from the HTML markup of the current page.
     *
     * @param page application notes page
     * @return PDF output stream
     * @throws IOException if error occurs in PDF generation
     */
    ByteArrayOutputStream generatePdfDocumentFromHtml(PageDecorator page) throws IOException;

    /**
     * Generate a PDF document from the published HTML markup of the current page.
     *
     * @param page application notes page
     * @param force if true, force regeneration of the PDF asset even if it already exists
     * @param publish if true, page will be requested from publish URL instead of author
     * @return DAM asset
     * @throws IOException if error occurs in PDF generation
     */
    Asset generatePdfDocumentFromHtml(PageDecorator page, boolean force, boolean publish) throws IOException;

    /**
     * Delete the PDF asset corresponding to the given page.
     *
     * @param page application notes page
     */
    void deletePdfDocument(PageDecorator page) throws PersistenceException;
}
