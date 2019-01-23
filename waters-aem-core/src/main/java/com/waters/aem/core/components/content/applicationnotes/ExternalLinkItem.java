package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class },
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExternalLinkItem {

    @Inject
    private String text;

    @LinkInject
    private Link link;

    @DialogField(fieldLabel = "Link Item Path",
        fieldDescription = "Enter or Select External Link Item Path",
        required = true,
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    public Link getLink() {
        return link;
    }

    @DialogField(fieldLabel = "Link Item Text",
        fieldDescription = "Enter Link Item Text",
        required = true,
        ranking = 1)
    @TextField
    public String getText() {
        return text;
    }

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    public Boolean isNewWindow() {
        return newWindow;
    }

    public void setLink(Link link) {
        this.link = link;
}

    public void setText(String text) {
        this.text = text;
    }

    public void setNewWindow(Boolean isNewWindow) {
        this.newWindow = isNewWindow;
    }

}