package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.form.captcha.CaptchaService;
import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Trouble Signing In",
    description = "This is the Sign In Trouble component for Waters site",
    path = WatersConstants.COMPONENT_PATH_FORMS)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { TroubleSigningIn.class, ComponentExporter.class },
    resourceType = TroubleSigningIn.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TroubleSigningIn implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/troublesigningin";

    @OSGiService
    private WatersAccountService accountService;

    @OSGiService
    private CaptchaService captchaService;

    @Inject
    private PageManagerDecorator pageManager;

    @DialogField(fieldLabel = "Redirect Page URL",
        fieldDescription = "Select or enter the redirect URL",
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link redirectLink;

    public Link getRedirectLink() {
        return LinkUtils.getExternalizedLink(pageManager, redirectLink);
    }

    public String getPasswordResetUrl() {
        return accountService.getPasswordResetUrl();
    }

    public String getChangePasswordUrl() {
        return accountService.getChangePasswordUrl();
    }

    public String getCaptchaSiteKey() {
        return captchaService.getSiteKey();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
