package com.waters.aem.core.components.structure;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.content.applicationnotes.LinkItem;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;

@Component(value = "External Footer",
        description = "This is the External Footer component for Waters site",
        editConfig = false,
        tabs = { @Tab(title = "Properties", touchUINodeName = "properties"),
                 @Tab(title = "Footer Links", touchUINodeName = "Footer Links") },
        path = WatersConstants.COMPONENT_PATH_STRUCTURE)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ExternalFooter implements ComponentExporter {

    @Self
    private Resource resource;

    @DialogField(fieldLabel="Waters Corporation Logo",
            tab=1,
            ranking=1)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @Inject
    private Image logoImage;

    @DialogField(fieldLabel = "Logo Link",
            tab=1,
            fieldDescription = "Select or enter the link URL",
            ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link logoLink;

    @DialogField(fieldLabel = "Image Alt Text",
            tab=1,
            fieldDescription = "Enter the ALT text for the logo image",
            ranking = 3)
    @TextField
    @Inject
    private String logoAltText;

    @DialogField(fieldLabel = "Copyright Text",
            tab=1,
            fieldDescription = "Enter the copyright text",
            ranking = 4)
    @TextField
    @Inject
    private String copyrightText;

    @DialogField(fieldLabel = "Footer Links",
            tab=2,
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<LinkItem> footerLinks;

    public Image getLogoImage() { return logoImage; }

    public Link getLogoLink() { return logoLink; }

    public String getLogoAltText() { return logoAltText; }

    public String getCopyrightText() { return copyrightText; }

    public List<LinkItem> getFooterLinks() { return footerLinks; }

    @Nonnull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
