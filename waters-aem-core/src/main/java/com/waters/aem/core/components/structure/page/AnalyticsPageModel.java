package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonRootName(value = "Page")
public class AnalyticsPageModel extends AbstractAnalyticsModel{

    @Self
    private SiteContext siteContext;

    @Self
    private ApplicationNotes applicationNotes;

    public String getCategory() {
        return getFirstLocalizedTitle(applicationNotes.getCategory());
    }

    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    public String getType() {
        return getFirstLocalizedTitle(applicationNotes.getContentType());
    }

}

