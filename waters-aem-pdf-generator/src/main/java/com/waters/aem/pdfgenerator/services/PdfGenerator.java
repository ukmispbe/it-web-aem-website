package com.waters.aem.pdfgenerator.services;

import com.itextpdf.layout.Document;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface PdfGenerator {

    ByteArrayOutputStream generatePdfDocument(SlingHttpServletRequest request) throws IOException;

    void updatePdfDocument(SlingHttpServletRequest request, Resource resource, Document document) throws IOException;
}
