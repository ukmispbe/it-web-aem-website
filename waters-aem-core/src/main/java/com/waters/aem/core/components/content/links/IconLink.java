package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.DialogFieldOverride;
import com.citytechinc.cq.component.annotations.Property;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class IconLink extends BasicLink {

    @DialogFieldOverride(ranking = 1, required = false, hideLabel = true, additionalProperties = {
    @Property(name = "cq:hideOnEdit", value = "true")
    })
    @Override
    public String getText() {
        return super.getText();
    }

    @DialogField(fieldLabel = "Link Item Icon",
        fieldDescription = "Select Link Item Icon",
        ranking = 2)
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
