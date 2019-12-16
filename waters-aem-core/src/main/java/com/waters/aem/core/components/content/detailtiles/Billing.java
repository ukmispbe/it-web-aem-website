package com.waters.aem.core.components.content.detailtiles;

import com.adobe.cq.export.json.ComponentExporter;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.Listener;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Billing Address Details Tile",
        description = "This is the Billing Address Details Tile component for Waters site my profile.",
        path = WatersConstants.COMPONENT_PATH_DETAIL_TILES,
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
        })
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { Billing.class, ComponentExporter.class },
        resourceType = Billing.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Billing extends AbstractDetailTiles {

    public static final String RESOURCE_TYPE = "waters/components/content/detailtiles/billing";

    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
