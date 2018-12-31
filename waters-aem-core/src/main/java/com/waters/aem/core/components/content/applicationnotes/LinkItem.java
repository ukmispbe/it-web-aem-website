package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.DialogFieldOverride;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.icfolson.aem.library.api.link.Link;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Default;

import javax.inject.Inject;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class LinkItem extends ExternalLinkItem {

    @DialogField(fieldLabel = "Link Item Icon",
            fieldDescription = "Select Link Item Icon",
            ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @LinkInject(inherit = true)
    private Link linkIcon;

    @DialogField(fieldLabel = "Open in New Window",
            fieldDescription = "Select this option to open in new window",
            ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    @DialogFieldOverride(ranking = 2, required = false, hideLabel = false)
    @Override
    public Link getLink(){ return super.getLink(); }

    @DialogFieldOverride(ranking = 1, required = false, hideLabel = false)
    @Override
    public String getText(){ return super.getText(); }

    public Boolean isNewWindow() { return newWindow; }

    public Link getLinkIcon() { return linkIcon; }
}
