package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

@Component(value = "Support Request Form",
    description = "This is the Support Request Form component for Waters site",
    path = WatersConstants.COMPONENT_PATH_FORMS,
    listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SupportRequestForm.class, ComponentExporter.class },
    resourceType = SupportRequestForm.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SupportRequestForm implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/supportrequestform";

    @OSGiService
    private WatersAccountService accountService;

    @Inject
    private PageManagerDecorator pageManager;

    @DialogField(fieldLabel = "Consent Link",
        fieldDescription = "Select or enter the link URL",
        required  = true,
        ranking = 1)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @LinkInject
    private Link consentLink;

    public Link getConsentLink() {
        return LinkUtils.getMappedLink(pageManager, consentLink);
    }

    public String getSupportRequestUrl() {
        return accountService.getSupportRequestUrl();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
