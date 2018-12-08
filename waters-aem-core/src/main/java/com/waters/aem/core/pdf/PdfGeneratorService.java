package com.waters.aem.core.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.sling.api.SlingHttpServletRequest;

import java.io.IOException;

public interface PdfGeneratorService {

    PDDocument generatePdfDocument(SlingHttpServletRequest request) throws IOException;
}
