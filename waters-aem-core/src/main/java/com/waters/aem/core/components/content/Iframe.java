package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.api.policies.ContentPolicy;
import com.day.cq.wcm.api.policies.ContentPolicyManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Iframe",
    description = "This is the Iframe component for Waters site",
    tabs = @Tab(title = "Iframe"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Iframe.class, ComponentExporter.class },
    resourceType = Iframe.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Iframe implements ComponentExporter{

    public static final String RESOURCE_TYPE = "waters/components/content/iframe";

    private static final String DEFAULT_HEIGHT = "600";

    private static final String HEIGHT = "height";

    @Inject
    private Resource resource;

    @Inject
    private ResourceResolver resourceResolver;

    @Inject
    private ContentPolicyManager contentPolicyManager;

    @DialogField(fieldLabel = "Source",
        fieldDescription = "Enter the source for the iframe",
        required = true)
    @TextField
    @Inject
    private String source;

    public String getSource() {
        return source;
    }

    public String getHeight() {
        String height = DEFAULT_HEIGHT;

        contentPolicyManager = resourceResolver.adaptTo(ContentPolicyManager.class);

        if (contentPolicyManager != null) {
            ContentPolicy contentPolicy = contentPolicyManager.getPolicy(resource);
            if (contentPolicy != null && contentPolicy.getProperties().get(HEIGHT) != null) {
                height = (String) contentPolicy.getProperties().get(HEIGHT);
            }
        }

        return height;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;

    }

}
