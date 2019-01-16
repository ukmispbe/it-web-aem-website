package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;

@Component(value = "External List", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class ExternalList implements ComponentExporter {

    @Self
    private Resource resource;

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter title for external list",
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter external article details",
        ranking = 2)
    @MultiField(composite = true)
    @Inject
    private List<ExternalLinkItem> externalLinkItems;

    @Nonnull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    public String getTitle() {
        return title;
    }

    public List<ExternalLinkItem> getExternalLinkItems() {
        return externalLinkItems;
    }
}
