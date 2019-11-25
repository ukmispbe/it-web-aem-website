package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.account.WatersAccountService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;

@Component(value = "Forgot Password",
description = "This is the Forgot Password component for Waters site",
path = WatersConstants.COMPONENT_PATH_FORMS)
@Model(adaptables = SlingHttpServletRequest.class,
adapters = { ForgotPassword.class, ComponentExporter.class },
resourceType = ForgotPassword.RESOURCE_TYPE,
defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ForgotPassword implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/forgotpassword";

    @OSGiService
    private WatersAccountService accountService;

    public String getChangePasswordUrl() {
        return accountService.getChangePasswordUrl();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}