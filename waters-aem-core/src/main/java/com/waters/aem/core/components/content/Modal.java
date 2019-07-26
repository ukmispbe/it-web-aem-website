package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Modal",
    description = "This is the Modal component for Waters site",
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Modal.class, ComponentExporter.class },
    resourceType = Modal.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Modal extends AbstractComponent implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/modal";

    @DialogField(fieldLabel = "Source Text",
        fieldDescription = "Enter the source text",
        required = true,
        ranking = 2)
    @TextField
    @Inject
    private String sourceText;

    @DialogField(fieldLabel = "Source Icon",
        fieldDescription = "Select source Icon",
        ranking = 2)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String sourceIcon;

    @DialogField(fieldLabel = "Modal Heading Text",
        fieldDescription = "Enter the text modal heading",
        ranking = 3)
    @TextField
    @Inject
    private String modalHeadingText;

    @DialogField(fieldLabel = "Modal Heading Icon",
        fieldDescription = "Select modal heading Icon",
        ranking = 4)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String modalHeadingIcon;

    @DialogField(fieldLabel = "Modal Body Text",
        fieldDescription = "Enter the modal body text",
        ranking = 5)
    @TextField
    @Inject
    private String modalBodyText;

    public String getSourceText() {
        return sourceText;
    }

    public String getSourceIcon() {
        return sourceIcon;
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

    public String getUniqueId() {
        return getId();
    }

    public Boolean isSourceIconSvg() {
        return LinkUtils.isSvg(sourceIcon);
    }

    public Boolean isHeadingIconSvg() {
        return LinkUtils.isSvg(modalHeadingIcon);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
