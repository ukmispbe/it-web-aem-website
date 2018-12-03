package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component(value = "External Articles" , path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class ExternalArticles {

    //To DO convert these to multi field
    @DialogField(fieldLabel = "Article Title",
            fieldDescription = "Enter the title of the Article",
            required = true,
            ranking = 1)
    @TextField
    @Inject
    private String articleTitle;

    @DialogField (fieldLabel = "Article Link",
            fieldDescription = "Enter the link of the Article",
            required = true,
            ranking = 2)
    @LinkInject
    private Link articleLink;

    public String getArticleTitle() {
        return articleTitle;
    }

    public Link getArticleLink() {
        return articleLink;
    }

}
