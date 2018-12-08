package com.waters.aem.core.pdf.provider.impl;

import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = ContentProvider.class,
    resourceType = Text.RESOURCE_TYPE)
public final class TextContentProvider implements ContentProvider {

    @Self
    private Text model;

    @Override
    public void writePdfContent(final PDPageContentStream contentStream)
        throws IOException {
        // TODO add formatting
        contentStream.showText(model.getText());
    }
}
