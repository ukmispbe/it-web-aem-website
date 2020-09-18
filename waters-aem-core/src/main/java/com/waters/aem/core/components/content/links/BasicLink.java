package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BasicLink {

    @Inject
    private String text;

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Link Item Text",
        fieldDescription = "Enter Link Item Text",
        required = true,
        ranking = 1)
    @TextField
    public String getText() {
        return text;
    }

    @DialogField(fieldLabel = "Link Item Path",
        fieldDescription = "Enter or Select Link Item Path",
        required = true,
        ranking = 2)
    @PathField(rootPath = WatersConstants.CONTENT_ROOT_PATH)
    @LinkInject
    private Link link;

    public Link getLink() {
        return link;
    }

    public Boolean isActive() {
        return currentPage.getPath().equals(link.getPath());
    }

    public Boolean isExternal() {
        return LinkUtils.isExternal(link);
    }
}