package com.waters.aem.core.components.content.detailtiles;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.Listener;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.account.WatersAccountService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Personal Details Tile",
        description = "This is the Personal Details Tile component for Waters site my profile",
        path = WatersConstants.COMPONENT_PATH_DETAIL_TILES,
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
        })
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { Personal.class, ComponentExporter.class },
        resourceType = Personal.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Personal implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/detailtiles/personal";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @OSGiService
    private WatersAccountService accountService;

    public String getMyAccountUrl() {
        return accountService.getMyAccountUrl();
    }

    public String getMyAccountUpdateUrl() {
        return accountService.getMyAccountUrl();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
