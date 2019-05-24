package com.waters.aem.core.components.structure.page.analytics;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonRootName(value = "page")
public class PageObjectData extends AbstractAnalyticsModel {

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ContentClassification contentClassification;

    public String getCategory() {
        return getFirstTagTitle(contentClassification.getCategory());
    }

    @Override
    public String getCountry() {
        return super.getCountry();
    }

    @Override
    protected String getLanguage() {
        return super.getLanguage();
    }

    public String getType() {
        return getFirstTagTitle(contentClassification.getContentType());
    }

}