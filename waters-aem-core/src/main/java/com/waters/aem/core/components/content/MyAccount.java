package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.utils.MyAccountUtils;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "My Account",
        description = "This is the My Account component for Waters site my account page",
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
        })
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { MyAccount.class, ComponentExporter.class },
        resourceType = MyAccount.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MyAccount implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/myaccount";

    @OSGiService
    private WatersAccountService accountService;

    @Inject
    private PageManagerDecorator pageManager;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @DialogField(fieldLabel = "My Account Body Text",
            fieldDescription = "The body text to display below the My Account title on the My Account Home page",
            ranking = 1)
    @TextField
    @Inject
    private String bodyText;

    @DialogField(fieldLabel = "Additional Resources",
            ranking = 2)
    @MultiField(composite = true)
    @Inject
    private List<BasicLink> links = new ArrayList<>();

    public List<BasicLink> getLinks() {
        return links;
    }

    public String getBodyText() {
        return bodyText;
    }

    public String getAdditionalResources() throws JsonProcessingException {
        final List<Map<String, Object>> additionalResources = new ArrayList<>();

        additionalResources.addAll(links.stream()
            .map(this::getLinkMap)
            .collect(Collectors.toList()));

        return MAPPER.writeValueAsString(additionalResources);
    }

    public String getCountriesJson() throws JsonProcessingException {
        return MyAccountUtils.getCountriesJson();
    }

    private Map<String, Object> getLinkMap(final BasicLink link) {
        final Map<String, Object> linkMap = new HashMap<>();


        linkMap.put("text", link.getText());
        linkMap.put("url", LinkUtils.getMappedLink(pageManager, link.getLink()).getHref());

        return linkMap;
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
