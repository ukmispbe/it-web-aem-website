package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SocialMediaButton {

    @DialogField(fieldLabel = "Button Icon",
        fieldDescription = "Select the icon of this button",
        required = true,
        ranking = 1)
    @PathField
    @Inject
    private String buttonIcon;

    @DialogField(fieldLabel = "Button URL",
        fieldDescription = "Enter the URL of this button",
        required = true,
        ranking = 2)
    @PathField
    @Inject
    private String buttonURL;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 3)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    public String getButtonIcon() {
        return buttonIcon;
    }

    public String getButtonURL() {
        return buttonURL;
    }

    public Boolean getNewWindow() {
        return newWindow;
    }
}
