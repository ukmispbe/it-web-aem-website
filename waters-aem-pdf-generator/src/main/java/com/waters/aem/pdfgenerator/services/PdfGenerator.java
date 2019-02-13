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
     * Generate a PDF document from the published HTML markup of the current page and store the asset in the DAM.
     *
     * @param page application notes page
     * @return DAM asset
     * @throws IOException if error occurs in PDF generation
     */
    Asset generatePdfDocumentAssetFromHtml(PageDecorator page) throws IOException;

    /**
     * Delete the PDF asset corresponding to the given page.
     *
     * @param page application notes page
     */
    void deletePdfDocument(PageDecorator page) throws PersistenceException;
}
