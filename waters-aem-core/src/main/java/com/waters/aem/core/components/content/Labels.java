package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.components.content.links.JsonFields;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.annotation.PostConstruct;
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

    private static final Logger LOG = LoggerFactory.getLogger(Labels.class);

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static final String PROPERTY_LABELS_JSON = "labels-json";

    public static final String PROPERTY_CONFIGS_JSON = "configs-json";
    
    @Inject
    private Resource resource;

    @DialogField(fieldLabel = "Labels",
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<JsonFields> labels = new ArrayList<>();

    public List<JsonFields> getLabels() {
        return labels;
    }

    @DialogField(fieldLabel = "Configs",
            tab = 2,
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<BasicLink> configs = new ArrayList<>();

    public List<BasicLink> getConfigs() {
        return configs;
    }


    @PostConstruct
    protected void updateOrCreateJson() {
        if (resource.isResourceType(Labels.RESOURCE_TYPE)) {
            try {
                ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
                Iterator<JsonFields> labelsItr = getLabels().iterator();
                Iterator<BasicLink> configsItr = getConfigs().iterator();
                Map jsonMap = new HashMap();
                while (labelsItr.hasNext()) {
                    JsonFields jsonFields = labelsItr.next();
                    jsonMap.put(jsonFields.getLabel(), jsonFields.getLabelText());
                }
                modifiableValueMap.put(PROPERTY_LABELS_JSON, jsonMap.size() > 0 ? MAPPER.writeValueAsString(jsonMap) : "");
                jsonMap.clear();
                while (configsItr.hasNext()) {
                    BasicLink basicLink = configsItr.next();
                    jsonMap.put(basicLink.getText(), basicLink.getLink().getPath());
                }
                modifiableValueMap.put(PROPERTY_CONFIGS_JSON, jsonMap.size() > 0 ? MAPPER.writeValueAsString(jsonMap) : "");
                resource.getResourceResolver().commit();
            } catch (Exception e) {
                LOG.error("Exception occurred while working on JSON properties: "+e.getMessage());
            }
        }
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}