package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExtendedLink extends BasicLink {

    @DialogField(fieldLabel = "Link Item Icon",
        fieldDescription = "Select Link Item Icon",
        ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_ICON_PATH)
    @Inject
    private String linkIcon;

    public Boolean isSvg() {
        return linkIcon != null && linkIcon.endsWith(".svg");
    }

    public String getLinkIcon() {
        return linkIcon;
    }
}
