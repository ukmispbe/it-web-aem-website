package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.icfolson.aem.library.api.link.Link;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.models.annotations.Default;

import javax.inject.Inject;


public class LinkItemWithIcon extends ExternalLinkItem {

    @DialogField(fieldLabel = "Link Item Icon",
        fieldDescription = "Select Link Item Icon",
        ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @LinkInject(inherit = true)
    private Link icon;

    @DialogField(fieldLabel = "Open in New Window",
            fieldDescription = "Select this option to open in new window",
            ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    public Link getIcon() {
        return icon;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }
}
