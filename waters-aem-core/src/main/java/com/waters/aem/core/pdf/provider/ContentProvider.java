package com.waters.aem.core.pdf.provider;

import org.apache.pdfbox.pdmodel.PDPageContentStream;

import java.io.IOException;

public interface ContentProvider {

    /**
     * Write PDF content for the current model instance to the PDF content stream.
     *
     * @param contentStream PDF content stream
     * @throws IOException if error occurs writing to the PDF
     */
    void writePdfContent(PDPageContentStream contentStream) throws IOException;
}
