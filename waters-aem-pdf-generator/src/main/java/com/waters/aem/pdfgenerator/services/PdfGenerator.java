package com.waters.aem.pdfgenerator.services;

import com.day.cq.dam.api.Asset;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.itextpdf.layout.Document;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

import java.io.IOException;

public interface PdfGenerator {

    /**
     * Get the DAM asset path of the generated PDF for the given page.
     *
     * @param page application notes page
     * @return PDF asset path
     */
    String getDamAssetPath(PageDecorator page);

    /**
     * Generate a PDF document from the current page.
     *
     * @param request application notes page request
     * @param force if true, force regeneration of the PDF asset even if it already exists
     * @return
     * @throws IOException
     */
    Asset getPdfDocument(SlingHttpServletRequest request, boolean force) throws IOException;

    /**
     * Generate a PDF document from the HTML markup of the current page.
     *
     * @param request application notes page request
     * @param force if true, force regeneration of the PDF asset even if it already exists
     * @return
     * @throws IOException
     */
    Asset getPdfDocumentFromHtml(SlingHttpServletRequest request, boolean force) throws IOException;

    void updatePdfDocument(SlingHttpServletRequest request, Resource resource, Document document) throws IOException;
}
