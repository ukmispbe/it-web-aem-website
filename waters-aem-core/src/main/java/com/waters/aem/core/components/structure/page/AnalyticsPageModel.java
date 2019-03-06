package com.waters.aem.core.components.structure.page;

import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnalyticsPageModel extends AbstractAnalyticsModel{

    @Self
    private SiteContext siteContext;

    @Self
    private ApplicationNotes applicationNotes;

    public List<String> getCategory() {
        return getLocalizedTitle(applicationNotes.getCategory());
    }

    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    public List<String> getType() {
        return getLocalizedTitle(applicationNotes.getContentType());
    }

}

