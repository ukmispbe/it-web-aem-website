package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Tile {

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter the Title for the tile",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Icon",
        fieldDescription = "Select the Icon to be displayed on the Tile",
        required = true,
        ranking = 2)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String icon;

    @DialogField(fieldLabel = "Link",
        fieldDescription = "Select or enter the link URL",
        required = true,
        ranking = 3)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link link;


    public String getTitle() {
        return title;
    }

    public Link getLink() {
        return link;
    }

    public String getIcon() {
        return icon;
    }

    public Boolean isExternal() {
        return LinkUtils.isExternal(link);
    }

    public Boolean isSvg() {
        return LinkUtils.isSvg(icon);
    }
}
