    package com.waters.aem.core.pdf;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;

import java.io.File;
import java.io.IOException;

    public class PdfUtils {

    public static final void convertToPdf(final String html) throws IOException {
            final File file = new File("/Users/mdaugherty/Downloads/waters.pdf");

        final PdfWriter writer = new PdfWriter(file);

        final ConverterProperties converterProperties = new ConverterProperties()
            .setBaseUri("http://localhost:4503");

        final Document document = HtmlConverter.convertToDocument(html, writer, converterProperties);

        document.close();
    }
}
