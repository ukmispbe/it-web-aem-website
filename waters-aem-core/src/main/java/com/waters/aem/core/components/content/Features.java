package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.waters.aem.core.components.content.links.Feature;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Features",
        description = "This is the Features component for Waters site",
        tabs = @Tab(title = "Properties"),
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
        })
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { Features.class, ComponentExporter.class },
        resourceType = Features.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class Features implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/features";

    @DialogField(fieldLabel = "Features List")
    @MultiField(composite = true)
    @Inject
    private List<Feature> features;

    public List<Feature> getFeatures() {
        return features;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
