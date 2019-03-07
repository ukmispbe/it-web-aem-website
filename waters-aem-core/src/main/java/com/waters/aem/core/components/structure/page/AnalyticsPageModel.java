package com.waters.aem.core.components.structure.page;

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
        return !applicationNotes.getCategory().isEmpty() ? getLocalizedTitle(applicationNotes.getCategory()).get(0) : "";
    }

    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    public String getType() {
        return !applicationNotes.getContentType().isEmpty() ? getLocalizedTitle(applicationNotes.getContentType()).get(0) : "";
    }

}

