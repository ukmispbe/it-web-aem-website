package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Modal Button",
    description = "This is the Modal Button component for Waters site",
    tabs = {
        @Tab(title = "Properties"),
        @Tab(title = "Modal")
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ModalButton.class, ComponentExporter.class },
    resourceType = ModalButton.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ModalButton implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/modalbutton";

    @DialogField(fieldLabel = "Button Text",
        fieldDescription = "Enter the text for the button",
        required = true)
    @TextField
    @Inject
    private String buttonText;

    @DialogField(fieldLabel = "Modal Heading Text",
        fieldDescription = "Enter the text modal heading button",
        required = true,
        tab = 2,
        ranking = 1)
    @TextField
    @Inject
    private String modalHeadingText;

    @DialogField(fieldLabel = "Modal Heading Icon",
        fieldDescription = "Select modal heading Icon",
        tab = 2,
        ranking = 2)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String modalHeadingIcon;

    @DialogField(fieldLabel = "Modal Body Text",
        fieldDescription = "Enter the modal body text",
        tab = 2,
        ranking = 3)
    @TextField
    @Inject
    private String modalBodyText;

    @DialogField(fieldLabel = "Call to Action Text",
        fieldDescription = "Enter call to action text",
        tab = 2,
        ranking = 4)
    @TextField
    @Inject
    private String callToActionText;

    @DialogField(fieldLabel = "Call to Action Link",
        fieldDescription = "Select or enter the link URL",
        tab = 2,
        ranking = 5)
    @PathField(rootPath = PathConstants.PATH_CONTENT)
    @LinkInject
    private Link callToActionLink;

    @DialogField(fieldLabel = "Cancel Button Text",
        fieldDescription = "Enter the text for the cancel button",
        tab = 2,
        ranking = 6)
    @TextField
    @Inject
    private String cancelButtonText;


    public String getButtonText() {
        return buttonText;
    }

    public String getModalHeadingText() {
        return modalHeadingText;
    }

    public String getModalHeadingIcon() {
        return modalHeadingIcon;
    }

    public String getModalBodyText() {
        return modalBodyText;
    }

    public String getCallToActionText() {
        return callToActionText;
    }

    public Link getCallToActionLink() {
        return callToActionLink;
    }

    public String getCancelButtonText() {
        return cancelButtonText;
    }

    public String getUniqueID() {
        return "";
    }

    public Boolean isSvg() {
        return LinkUtils.isSvg(modalHeadingIcon);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
