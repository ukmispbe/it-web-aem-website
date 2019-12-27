package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;

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

    @DialogField(fieldLabel = "Profile Path",
            fieldDescription = "Enter or Select Profile Path",
            required = true,
            ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link profileLink;

    @DialogField(fieldLabel = "Password Path",
            fieldDescription = "Enter or Select Password Path",
            required = true,
            ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link passwordLink;

    @DialogField(fieldLabel = "Order History Path",
            fieldDescription = "Enter or Select Order History Path",
            required = true,
            ranking = 3)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link orderHistoryLink;

    @DialogField(fieldLabel = "Technical Support Path",
            fieldDescription = "Enter or Select Technical Support Path",
            required = true,
            ranking = 4)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link techSupportLink;

    @DialogField(fieldLabel = "Knowledgebase Path",
            fieldDescription = "Enter or Select Waters Knowledgebase Path",
            required = true,
            ranking = 5)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link knowledgebaseLink;

    @DialogField(fieldLabel = "Training Courses Path",
            fieldDescription = "Enter or Select Training Courses Path",
            required = true,
            ranking = 6)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link trainingLink;

    @DialogField(fieldLabel = "Contact Path",
            fieldDescription = "Enter or Select Contact Path",
            required = true,
            ranking = 7)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link contactLink;

    public Link getProfileLink() {
        return profileLink;
    }

    public Link getPasswordLink() {
        return passwordLink;
    }

    public Link getOrderHistoryLink() {
        return orderHistoryLink;
    }

    public Link getTechSupportLink() {
        return techSupportLink;
    }

    public Link getKnowledgebaseLink() {
        return knowledgebaseLink;
    }

    public Link getTrainingLink() {
        return trainingLink;
    }

    public Link getContactLink() {
        return contactLink;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
