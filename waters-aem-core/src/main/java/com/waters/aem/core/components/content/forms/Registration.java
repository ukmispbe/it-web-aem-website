package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.form.captcha.CaptchaService;
import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.utils.LinkUtils;
import com.waters.aem.core.utils.MyAccountUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Registration Form",
    description = "This is the Registration Form component for Waters site",
    path = WatersConstants.COMPONENT_PATH_FORMS,
        tabs = {
                @Tab(title = "Registration"),
                @Tab(title = "Legal (Korea)")
        },
    listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Registration.class, ComponentExporter.class },
    resourceType = Registration.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Registration implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/registration";

    @OSGiService
    private WatersAccountService accountService;

    @OSGiService
    private CaptchaService captchaService;

    @Inject
    private PageManagerDecorator pageManager;

    @DialogField(fieldLabel = "Login Link",
        fieldDescription = "Select or enter the link URL",
        required  = true,
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link loginLink;

    @DialogField(fieldLabel = "Privacy Notice Link",
        fieldDescription = "Select or enter the link URL",
        required  = true,
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link privacyNoticeLink;

    @DialogField(fieldLabel = "Terms of Use Link",
        fieldDescription = "Select or enter the link URL for Terms of Use",
        required  = true,
        ranking = 3)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link termsOfUseLink;

    @DialogField(fieldLabel = "Redirect Link",
        fieldDescription = "Select or enter the redirect link URL. The destination page the user will be redirected " +
        "to after successful submission",
        required  = true,
        ranking = 4)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link redirectLink;

    @DialogField(fieldLabel = "Redirect Link",
            fieldDescription = "Select or enter the redirect link URL. The destination page the user will be redirected " +
                    "to after successful submission",
            required  = true,
            ranking = 5)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link redirectEcommLink;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open 'Privacy Notice' in new window",
        ranking = 5)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    @DialogField(fieldLabel = "Privacy Disclosures Link",
            fieldDescription = "Select or enter the link URL for Privacy Disclosures",
            tab = 2,
            ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link privacyDisclosuresLink;

    @DialogField(fieldLabel = "Consent Disclosures Link",
            fieldDescription = "Select or enter the link URL for Consent Disclosures",
            tab = 2,
            ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link consentDisclosuresLink;

    public Link getLoginLink() {
        return loginLink;
    }

    public Link getPrivacyNoticeLink() {
        return LinkUtils.getMappedLink(pageManager, privacyNoticeLink);
    }

    public Link getRedirectLink() {
        return LinkUtils.getExternalizedLink(pageManager, redirectLink);
    }

    public Link getTermsOfUseLink() {
        return termsOfUseLink;
    }

    public Link getRedirectEcommLink() {
        return redirectEcommLink;
    }

    public Link getPrivacyDisclosuresLink() {
        return privacyDisclosuresLink;
    }

    public Link getConsentDisclosuresLink() {
        return consentDisclosuresLink;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    public String getCountriesJson() throws JsonProcessingException {
        return MyAccountUtils.getCountriesJson();
    }

    public String getRegistrationSubmitUrl() {
        return accountService.getRegistrationSubmitUrl();
    }

    public String getEmailValidationUrl() {
        return accountService.getEmailValidationUrl();
    }

    public String getCaptchaSiteKey() {
        return captchaService.getSiteKey();
    }

    public String getPasswordResetUrl() {
        return accountService.getPasswordResetUrl();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
