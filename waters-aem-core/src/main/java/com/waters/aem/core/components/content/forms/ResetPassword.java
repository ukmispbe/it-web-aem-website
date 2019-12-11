package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.form.captcha.CaptchaService;
import com.waters.aem.core.services.account.WatersAccountService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;

@Component(value = "Reset Password",
    description = "This is the Reset Password component for Waters site",
    path = WatersConstants.COMPONENT_PATH_FORMS)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ResetPassword.class, ComponentExporter.class },
    resourceType = ResetPassword.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ResetPassword implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/resetpassword";

    @OSGiService
    private WatersAccountService accountService;

    @OSGiService
    private CaptchaService captchaService;

    @DialogField(fieldLabel = "Redirect Page URL",
        fieldDescription = "Select or enter the redirect URL",
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link redirectLink;

    public Link getRedirectLink() {
        return redirectLink;
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