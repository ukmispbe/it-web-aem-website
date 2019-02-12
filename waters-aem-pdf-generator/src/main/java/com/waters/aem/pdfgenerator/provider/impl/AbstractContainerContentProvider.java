package com.waters.aem.pdfgenerator.provider.impl;

import com.itextpdf.layout.Document;
import com.waters.aem.pdfgenerator.provider.PdfContentProvider;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
import java.io.IOException;

public abstract class AbstractContainerContentProvider implements PdfContentProvider {

    @Inject
    protected Resource resource;

    @OSGiService
    protected PdfGenerator pdfGenerator;

    protected void writeContainerPdfContent(final SlingHttpServletRequest request, final Resource resource,
        final Document document) throws IOException {
        if (resource != null) {
            // get content for nested resources
            for (final Resource child : resource.getChildren()) {
                // pdfGenerator.updatePdfDocument(request, child, document);
            }
        }
    }
}
