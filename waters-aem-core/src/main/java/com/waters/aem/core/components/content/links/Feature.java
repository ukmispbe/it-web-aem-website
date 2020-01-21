package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
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
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@SuppressWarnings({"common-java:DuplicatedBlocks"})
public class Feature {

    @DialogField(fieldLabel = "Title",
            fieldDescription = "Enter the Title for the feature",
            ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Description",
            fieldDescription = "Enter the description for the feature",
            ranking = 2)
    @TextField
    @Inject
    private String description;

    @DialogField(fieldLabel = "Icon",
            fieldDescription = "Select the Icon to be displayed on the feature",
            required = true,
            ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String icon;

    @DialogField(fieldLabel = "Links",
            ranking = 4)
    @MultiField(composite = true)
    @Inject
    private List<BasicLink> links;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getIcon() {
        return icon;
    }

    public List<BasicLink> getLinks() {
        return links;
    }

    public Boolean isSvg() {
        return LinkUtils.isSvg(icon);
    }
}
