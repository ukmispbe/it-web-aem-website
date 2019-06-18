package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialLinkItem {

    @DialogField(fieldLabel = "Link Item Path",
        fieldDescription = "Enter or Select Link Item Path",
        required = true,
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link link;

    @DialogField(fieldLabel = "Link Item Icon",
        fieldDescription = "Select the Icon to be displayed",
        required = true,
        ranking = 2)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String linkIcon;

    public Link getLink() {
        return link;
    }

    public Boolean isSvg() {
        return linkIcon != null && linkIcon.endsWith(".svg");
    }

    public String getLinkIcon() {
        return linkIcon;
    }
}

