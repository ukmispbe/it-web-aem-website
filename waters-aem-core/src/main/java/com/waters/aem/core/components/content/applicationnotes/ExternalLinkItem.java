package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
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
        fieldDescription = "Enter or Select ExternalLinkItem Path",
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
}
