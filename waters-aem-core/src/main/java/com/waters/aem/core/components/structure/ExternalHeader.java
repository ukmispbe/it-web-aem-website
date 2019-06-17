package com.waters.aem.core.components.structure;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.DialogFieldSet;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.applicationnotes.LinkItem;
import com.waters.aem.core.components.content.applicationnotes.RegionLinkItem;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.launch.AdobeLaunchService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import java.util.List;

@Component(value = "External Header",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    tabs = {
        @Tab(title = "Properties"),
        @Tab(title = "Header Links"),
        @Tab(title = "Region Selector")
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ExternalHeader.class, ComponentExporter.class },
    resourceType = ExternalHeader.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class ExternalHeader extends AbstractComponent implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/structure/externalheader";

    @Self
    private SiteContext siteContext;

    @OSGiService
    private AdobeLaunchService adobeLaunchService;

    @DialogField(fieldLabel = "Header Logo",
        fieldDescription = "select header logo",
        ranking = 1)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @ImageInject(inherit = true)
    private Image logo;

    @DialogField(fieldLabel = "Logo Link",
        fieldDescription = "Select or Enter Logo Link",
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link logoLink;

    @DialogField(fieldLabel = "Logo Alt Text",
        fieldDescription = "Enter Alt Text for Logo",
        ranking = 3)
    @TextField
    @InheritInject
    private String logoAltText;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @InheritInject
    @Default(booleanValues = false)
    private Boolean newWindow;

    @DialogField(fieldLabel = "Search Path",
        fieldDescription = "Select Search Path",
        tab = 2,
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link searchPath;

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter external article details",
        tab = 2,
        ranking = 2)
    @MultiField(composite = true)
    @InheritInject
    private List<LinkItem> linkItems;

    @DialogField(tab = 3)
    @DialogFieldSet(namePrefix = "./regionLinkItem/")
    public RegionLinkItem getRegionLinkItem() {
        return getComponentNodeInherited("regionLinkItem")
            .transform(componentNode -> componentNode.getResource().adaptTo(RegionLinkItem.class))
            .orNull();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public Link getSearchPath() {
        return searchPath;
    }

    public Image getLogo() {
        return logo;
    }

    public Link getLogoLink() {
        return logoLink;
    }

    public String getLogoAltText() {
        return logoAltText;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    public List<LinkItem> getLinkItems() {
        return linkItems;
    }

    public String getLanguageLocation() {
        return siteContext.getLanguageLocation();
    }

    public String getLaunchScript() {
        return adobeLaunchService.getLaunchScript();
    }
}
