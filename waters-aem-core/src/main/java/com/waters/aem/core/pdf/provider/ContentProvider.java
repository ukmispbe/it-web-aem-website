package com.waters.aem.core.pdf.provider;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.layout.Document;
import org.apache.sling.api.SlingHttpServletRequest;

import java.io.IOException;

public interface ContentProvider {

    /**
     * Write PDF content for the current model instance to the PDF content stream.
     *
     * @param request servlet request
     * @param document PDF document
     * @param converterProperties converter properties
     * @throws IOException if error occurs writing to the PDF
     */
    void writePdfContent(SlingHttpServletRequest request, Document document, ConverterProperties converterProperties)
        throws IOException;
}
