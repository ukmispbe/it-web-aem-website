package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.DialogFieldOverride;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
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

    @DialogField(fieldLabel = "Open in New Window",
    fieldDescription = "Select this option to open in new window",
    ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    public String getTitle() {
        return title;
    }

    public Link getLink() {
        return link;
    }

    public String getIcon() {
        return icon;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    public Boolean isSvg() {
        return icon != null && icon.endsWith(".svg");
    }
}
