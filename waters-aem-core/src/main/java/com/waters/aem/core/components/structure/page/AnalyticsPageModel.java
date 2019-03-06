package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnalyticsPageModel extends AbstractAnalyticsModel{

    @Inject
    private static PageDecorator currentPage;

    @Self
    private static SiteContext siteContext;

    @Self
    private static ApplicationNotes applicationNotes;

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

