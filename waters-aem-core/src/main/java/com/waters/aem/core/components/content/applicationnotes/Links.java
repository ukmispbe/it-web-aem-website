package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.api.policies.ContentPolicy;
import com.day.cq.wcm.api.policies.ContentPolicyManager;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;

@Component(value = "Links",
path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = SlingHttpServletRequest.class,
adapters = { Links.class, ComponentExporter.class },
resourceType = Links.RESOURCE_TYPE,
defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Links implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/links";

    @Inject
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
    private List<BasicLink> linkItems;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public String getTitle() {
        return title;
    }

    public List<BasicLink> getLinkItems() {
        return linkItems;
    }

    public boolean isApplySplit() {
        ContentPolicyManager contentPolicyManager = resource.getResourceResolver().adaptTo(ContentPolicyManager.class);
        ContentPolicy contentPolicy = contentPolicyManager.getPolicy(resource);
        if (contentPolicy != null) {
            final Long splitPolicy = contentPolicy.getProperties().get("splitAfter", Long.class);
            return linkItems.size() > splitPolicy;
        }
        return false;
    }
}