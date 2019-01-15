package com.waters.aem.core.pdf.provider.impl;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Text;
import com.waters.aem.core.components.content.Title;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = ContentProvider.class,
    resourceType = Title.RESOURCE_TYPE)
public final class TitleContentProvider implements ContentProvider {

    @Self
    private Title model;

    @Override
    public void writePdfContent(final SlingHttpServletRequest request, final Document document,
        final ConverterProperties converterProperties) throws IOException {
        final Paragraph paragraph = new Paragraph();

        paragraph.add(new Text(model.getText())
            .setFontSize(14)
            .setBold());

        document.add(paragraph);
    }
}
