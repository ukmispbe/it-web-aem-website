package com.waters.aem.core.pdf.provider.impl;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Text;
import com.waters.aem.core.components.content.applicationnotes.SectionContainer;
import com.waters.aem.core.pdf.PdfGeneratorService;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = ContentProvider.class,
    resourceType = SectionContainer.RESOURCE_TYPE)
public final class SectionContainerContentProvider implements ContentProvider {

    @Self
    private SectionContainer model;

    @Inject
    private Resource resource;

    @OSGiService
    private PdfGeneratorService pdfGeneratorService;

    @Override
    public void writePdfContent(final SlingHttpServletRequest request, final Document document,
        final ConverterProperties converterProperties) throws IOException {
        final Paragraph paragraph = new Paragraph().add(new Text(model.getTitle())
            .setFontSize(14)
            .setBold());

        document.add(paragraph);

        final Resource par = resource.getChild("par");

        if (par != null) {
            // get content for nested resources
            for (final Resource child : par.getChildren()) {
                pdfGeneratorService.updatePdfDocument(request, child, document);
            }
        }
    }
}
