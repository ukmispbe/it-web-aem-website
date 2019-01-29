package com.waters.aem.pdfgenerator.provider.impl;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.layout.Document;
import com.waters.aem.core.components.content.LayoutContainer;
import com.waters.aem.pdfgenerator.provider.PdfContentProvider;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = PdfContentProvider.class,
    resourceType = LayoutContainer.RESOURCE_TYPE)
public final class LayoutContainerContentProvider extends AbstractContainerContentProvider {

    @Override
    public void writePdfContent(final SlingHttpServletRequest request, final Document document,
        final ConverterProperties converterProperties) throws IOException {
        writeContainerPdfContent(request, resource, document);
    }
}
