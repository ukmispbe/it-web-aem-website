package com.waters.aem.core.components.structure.page.analytics;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageData extends AbstractAnalyticsModel {

    @Self
    SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private Sku sku;

    @Inject
    private ContentClassification contentClassification;

    public String getCategory() {
        return sku != null ? "sku" : getFirstTagTitle(contentClassification.getCategory());
    }

    public String getCountry() {
        return siteContext. getLocaleWithCountry().getCountry();
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    public String getType() {
        return sku != null ? currentPage.getParent().getTitle() :
            getFirstTagTitle(contentClassification.getContentType());
    }

}