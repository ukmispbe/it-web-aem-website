package com.waters.aem.core.pdf;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class PdfUtils {

    public static void convertToPdf(final String pageUrl) throws IOException {
        final File file = new File("/Users/mdaugherty/Downloads/waters.pdf");

        final PdfWriter writer = new PdfWriter(file);

        final ConverterProperties converterProperties = new ConverterProperties()
            .setBaseUri("https://test-www.waters.com")
            .setMediaDeviceDescription(new MediaDeviceDescription(MediaType.SCREEN));


        final URL url = new URL(pageUrl);

        final InputStream stream = url.openStream();

        final Document document = HtmlConverter.convertToDocument(stream, writer, converterProperties);

        document.close();
        stream.close();
    }
}
