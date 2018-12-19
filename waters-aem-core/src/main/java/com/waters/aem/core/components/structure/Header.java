package com.waters.aem.core.components.structure;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.content.applicationnotes.LinkItemWithIcon;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.List;

@Component(value = "Header",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    tabs = {@Tab(title = "Properties", touchUINodeName = "properties"),
            @Tab(title = "Header Links", touchUINodeName = "header links")}
     )
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Header {

    @DialogField(fieldLabel = "Header Logo",
        fieldDescription = "select header logo",
        required = true,
        ranking = 1)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @LinkInject
    private Link logo;

    @DialogField(fieldLabel = "Logo Link",
        fieldDescription = "Select or Enter Logo Link",
        required = true,
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link logoLink;

    @DialogField( fieldLabel = "Log Alt Text",
        fieldDescription = "Enter Alt Text for Logo",
        ranking = 3)
    @TextField
    @Inject
    private String logoAltText;

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter external article details",
        tab = 2)
    @MultiField(composite = true)
    @InheritInject
    private List<LinkItemWithIcon> linkItems;

    public Link getLogo() {
        return logo;
    }

    public Link getLogoLink() {
        return logoLink;
    }

    public String getLogoAltText() {
        return logoAltText;
    }

    public List<LinkItemWithIcon> getLinkItems() {
        return linkItems;
    }
}
