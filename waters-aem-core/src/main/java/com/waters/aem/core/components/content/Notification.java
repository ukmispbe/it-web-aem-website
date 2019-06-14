package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.components.content.links.NewWindowLink;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;

@Component(value = "Notification",
    description = "This is the Notification component for Waters site",
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Notification.class, ComponentExporter.class },
    resourceType = Notification.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Notification implements  ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/notification";

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter the Title",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Description",
        fieldDescription = "Enter the description",
        ranking = 2)
    @TextField
    @Inject
    private String description;

    @DialogField(fieldLabel = "Icon",
        fieldDescription = "Select the Icon to be displayed on the Tile",
        required = true,
        ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String icon;

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter the Link items",
        ranking = 4)
    @MultiField(composite = true)
    @Inject
    private List<NewWindowLink> linkItems;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getIcon() {
        return icon;
    }

    public List<NewWindowLink> getLinkItems() {
        return linkItems;
    }

    public Boolean isSvg() {
        return icon != null && icon.endsWith(".svg");
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
