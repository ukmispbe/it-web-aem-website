package com.waters.aem.pdfgenerator.services;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.itextpdf.layout.Document;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public interface PdfGenerator {

    String getDamAssetPath(PageDecorator page);

    void convertPdfDocumentFromHtml(SlingHttpServletRequest request, OutputStream outputStream) throws IOException;

    ByteArrayOutputStream generatePdfDocument(SlingHttpServletRequest request) throws IOException;

    void updatePdfDocument(SlingHttpServletRequest request, Resource resource, Document document) throws IOException;
}
