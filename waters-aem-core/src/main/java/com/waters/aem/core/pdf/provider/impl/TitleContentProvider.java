package com.waters.aem.core.pdf.provider.impl;

import com.waters.aem.core.components.content.Title;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
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
    public void writePdfContent(final PDPageContentStream contentStream)
        throws IOException {
        contentStream.setFont(PDType1Font.HELVETICA, 16);
        contentStream.showText(model.getText());
    }
}
