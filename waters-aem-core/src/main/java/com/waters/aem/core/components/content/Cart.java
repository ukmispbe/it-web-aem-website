package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.components.content.links.JsonFields;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.utils.LinkUtils;
import com.waters.aem.core.utils.MyAccountUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

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
        adapters = { Cart.class, ComponentExporter.class },
        resourceType = Cart.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Cart implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/cart";

    @OSGiService
    private WatersAccountService accountService;

    @Inject
    private PageManagerDecorator pageManager;

    @DialogField(fieldLabel = "Labels",
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<JsonFields> labels = new ArrayList<>();

    public List<JsonFields> getLabels() {
        return labels;
    }

    @DialogField(fieldLabel = "Endpoints",
            tab = 2,
            ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<BasicLink> endpoints = new ArrayList<>();

    public List<BasicLink> getLinks() {
        return endpoints;
    }

    public String getCountriesJson() throws JsonProcessingException {
        return MyAccountUtils.getCountriesJson();
    }

    public String getUserDetailsUrl() {
        return accountService.getUserDetailsUrl();
    }

    public String getMyAccountUpdateUrl() {
        return accountService.getUpdateProfileUrl();
    }

    public String getUpdatePasswordUrl() {
        return accountService.getUpdatePasswordUrl();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}