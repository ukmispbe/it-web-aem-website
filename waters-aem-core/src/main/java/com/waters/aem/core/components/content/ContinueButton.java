package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Continue Button",
    description = "This is the Continue Button component for Waters site. This button is used to redirect to the " +
    "users last known page or homepage")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ContinueButton.class, ComponentExporter.class },
    resourceType = ContinueButton.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ContinueButton implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/continuebutton";

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Button Text",
        fieldDescription = "Enter the text for the button",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String buttonText;

    @DialogField(fieldLabel = "Button Tool Tip",
        fieldDescription = "Enter the tool tip text",
        ranking = 2)
    @TextField
    @Inject
    private String buttonToolTip;

    public String getButtonText() {
        return buttonText;
    }

    public String getButtonToolTip() {
        return buttonToolTip;
    }

    public Link getHomePageLink() {
        return LinkUtils.getCurrentHomepageLink(currentPage);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
