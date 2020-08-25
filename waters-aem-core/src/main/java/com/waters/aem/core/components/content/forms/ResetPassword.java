package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.form.captcha.CaptchaService;
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

@Component(value = "Reset/Update Password",
    description = "This is the Reset/Update Password component for Waters site.",
    path = WatersConstants.COMPONENT_PATH_FORMS)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ResetPassword.class, ComponentExporter.class },
    resourceType = ResetPassword.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ResetPassword implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/resetpassword";

    protected static final String RESET_OPTION = "reset";

    protected static final String UPDATE_OPTION = "update";
    
    protected static final String EPROC_CREATE_ACCOUNT_OPTION = "createAccount";

    protected static final String RESET_BUTTON_TEXT = "Reset Password";

    protected static final String UPDATE_BUTTON_TEXT = "Update Password";
    
    protected static final String EPROC_CREATE_ACCOUNT_BUTTON_TEXT = "Create Account";

    protected static final String RESET_TEXT = "You are resetting the password for the account associated with the email address";

    protected static final String UPDATE_TEXT = "In order to provide additional account security our password requirements have changed." +
        " Please create a new password for the account associated with the email address";

    protected static final String EPROC_CREATE_ACCOUNT_TEXT = "Thanks for confirming your procurement account! You will need to create a password to create your Waters.com account.";
    
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

    @DialogField(fieldLabel = "Form Type",
        fieldDescription = "Select the functional type for this form",
        ranking = 2)
    @Selection(
    type = Selection.SELECT,
    options = {
            @Option(text = RESET_BUTTON_TEXT, value = RESET_OPTION),
            @Option(text = UPDATE_BUTTON_TEXT, value = UPDATE_OPTION),
            @Option(text = EPROC_CREATE_ACCOUNT_BUTTON_TEXT, value = EPROC_CREATE_ACCOUNT_OPTION)
        }
    )
    @Inject
    @Default(values = RESET_OPTION)
    private String formType;
    
    @DialogField(fieldLabel = "Privacy Notice Link",
        fieldDescription = "Select or enter the link URL",
        required  = true,
        ranking = 3)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link privacyNoticeLink;

    @DialogField(fieldLabel = "Terms of Use Link",
        fieldDescription = "Select or enter the link URL for Terms of Use",
        required  = true,
        ranking = 4)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link termsOfUseLink;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open 'Privacy Notice' in new window",
        ranking = 5)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;
        
    public Link getRedirectLink() {
        return LinkUtils.getExternalizedLink(pageManager, redirectLink);
    }

    public String getFormType() {
        return formType;
    }

	public String getFormText() {
		String formText = "";
		if (formType.equals(RESET_OPTION)) {
			formText = RESET_TEXT;
		} else if (formType.equals(UPDATE_OPTION)) {
			formText = UPDATE_TEXT;
		} else if (formType.equals(EPROC_CREATE_ACCOUNT_OPTION)) {
			formText = EPROC_CREATE_ACCOUNT_TEXT;
		}
		return formText;
	}

    public String getSubmitEndpoint() {
        return accountService.getChangePasswordUrl();
    }

    public String getChooseAccountEndpoint() {
        return accountService.getChooseAccountEndpoint();
    }

	public String getButtonText() {
		String buttonText = "";
		if (formType.equals(RESET_OPTION)) {
			buttonText = RESET_BUTTON_TEXT;
		} else if (formType.equals(UPDATE_OPTION)) {
			buttonText = UPDATE_BUTTON_TEXT;
		} else if (formType.equals(EPROC_CREATE_ACCOUNT_OPTION)) {
			buttonText = EPROC_CREATE_ACCOUNT_BUTTON_TEXT;
		}
		return buttonText;
	}

    public String getCaptchaSiteKey() {
        return captchaService.getSiteKey();
    }

    public Link getPrivacyNoticeLink() {
        return LinkUtils.getMappedLink(pageManager, privacyNoticeLink);
    }

    public Link getTermsOfUseLink() {
        return termsOfUseLink;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}