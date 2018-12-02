package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.CheckBox;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

@Component("Button")
@Model(adaptables = Resource.class, defaultInjectionStrategy = OPTIONAL)
public final class Button {

    @DialogField(fieldLabel = "Button",
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

    @DialogField(fieldLabel = "Button URL",
        fieldDescription = "Select or enter the link URL",
        required = true,
        ranking = 3)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link buttonLink;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 4)
    @CheckBox
    @Inject
    private Boolean newWindow;

    public String getButtonText() {
        return buttonText;
    }

    public String getButtonToolTip() {
        return buttonToolTip;
    }

    public Link getButtonLink() {
        return buttonLink;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }
}
