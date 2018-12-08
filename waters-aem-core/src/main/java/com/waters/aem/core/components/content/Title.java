package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.pdf.PdfContentProvider;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.Nonnull;
import java.io.IOException;

@Component(value = "Title",
    description = "Section Heading",
    resourceSuperType = Title.RESOURCE_SUPER_TYPE,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Title.RESOURCE_TYPE)
public final class Title implements com.adobe.cq.wcm.core.components.models.Title, PdfContentProvider {

    public static final String RESOURCE_TYPE = "waters/components/content/title";

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/title/v2/title";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Title delegate; // delegate to core component class

    @Override
    public String getText() {
        return delegate.getText();
    }

    @Override
    public String getType() {
        return delegate.getType();
    }

    @Override
    public String getLinkURL() {
        return delegate.getLinkURL();
    }

    @Override
    public boolean isLinkDisabled() {
        return delegate.isLinkDisabled();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return delegate.getExportedType();
    }

    @Override
    public void writePdfContent(final PDPageContentStream contentStream) throws IOException {
        // contentStream.setFont(PDType1Font.HELVETICA, 16);
        contentStream.showText(getText());
    }
}
