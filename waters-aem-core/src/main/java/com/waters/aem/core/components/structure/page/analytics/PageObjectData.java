package com.waters.aem.core.components.structure.page.analytics;

import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageObjectData extends AbstractAnalyticsModel {

    @Self
    SiteContext siteContext;

    @Inject
    private ContentClassification contentClassification;

    public String getCategory() {
        return getFirstTagTitle(contentClassification.getCategory());
    }

    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }


    public String getType() {
        return getFirstTagTitle(contentClassification.getContentType());
    }

}