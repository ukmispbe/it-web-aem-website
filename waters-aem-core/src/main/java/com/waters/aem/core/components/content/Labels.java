package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.components.content.links.JsonFields;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.*;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

@Component(value = "Labels",
        description = "This is the Labels component for Waters site",
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
        },
        tabs = {
                @Tab(title = "Labels"),
                @Tab(title = "Configs")
        }
)
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {Labels.class, ComponentExporter.class},
        resourceType = Labels.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Labels implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/labels";

    @DialogField(fieldLabel = "Labels",
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<JsonFields> labelList = new ArrayList<>();

    public List<JsonFields> getLabelList() {
        return labelList;
    }

    @DialogField(fieldLabel = "Configs",
            tab = 2,
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<BasicLink> configList = new ArrayList<>();

    public List<BasicLink> getConfigList() {
        return configList;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}