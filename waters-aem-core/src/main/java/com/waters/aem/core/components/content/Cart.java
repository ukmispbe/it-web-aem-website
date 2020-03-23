package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.components.content.links.JsonFields;
import com.waters.aem.core.services.account.WatersAccountService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.*;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

@Component(value = "Cart",
        description = "This is the Cart component for Waters site my account page",
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
        adapters = {Cart.class, ComponentExporter.class},
        resourceType = Cart.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Cart implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/cart";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static final String PROPERTY_LABELS_JSON = "cart-labels";

    public static final String PROPERTY_CONFIGS_JSON = "cart-configs";
    
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
    protected void updateNode() {
        if (resource.isResourceType(Cart.RESOURCE_TYPE)) {
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
                e.printStackTrace();
            }
        }
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}