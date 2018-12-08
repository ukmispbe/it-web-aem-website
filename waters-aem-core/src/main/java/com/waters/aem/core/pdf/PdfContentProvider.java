package com.waters.aem.core.pdf;

import org.apache.pdfbox.pdmodel.PDPageContentStream;

import java.io.IOException;

/**
 * Definition for model classes that provide writable PDF content.
 */
public interface PdfContentProvider {

    /**
     * Write PDF content for the current model instance to the PDF content stream.
     *
     * @param contentStream PDF content stream
     * @throws IOException if error occurs writing to the PDF
     */
    void writePdfContent(PDPageContentStream contentStream) throws IOException;
}
