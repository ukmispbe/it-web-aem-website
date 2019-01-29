package com.waters.aem.pdfgenerator.provider.impl;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Text;
import com.waters.aem.core.components.content.applicationnotes.SectionContainer;
import com.waters.aem.pdfgenerator.provider.PdfContentProvider;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = PdfContentProvider.class,
    resourceType = SectionContainer.RESOURCE_TYPE)
public final class SectionContainerContentProvider extends AbstractContainerContentProvider {

    @Self
    private SectionContainer model;

    @Override
    public void writePdfContent(final SlingHttpServletRequest request, final Document document,
        final ConverterProperties converterProperties) throws IOException {
        final Paragraph paragraph = new Paragraph().add(new Text(model.getTitle())
            .setFontSize(14)
            .setBold());

        document.add(paragraph);

        writeContainerPdfContent(request, resource.getChild("par"), document);
    }
}
