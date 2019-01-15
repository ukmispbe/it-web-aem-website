package com.waters.aem.core.pdf;

import org.apache.sling.api.SlingHttpServletRequest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface PdfGeneratorService {

    ByteArrayOutputStream generatePdfDocument(SlingHttpServletRequest request) throws IOException;
}
