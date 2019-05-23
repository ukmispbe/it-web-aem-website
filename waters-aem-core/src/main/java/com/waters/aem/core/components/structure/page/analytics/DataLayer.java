package com.waters.aem.core.components.structure.page.analytics;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.structure.page.analytics.impl.AppnotesPageAnalytics;
import com.waters.aem.core.components.structure.page.analytics.impl.LibraryPageAnalytics;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class DataLayer {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Self
    private SiteContext siteContext;

    @Self
    private AppnotesPageAnalytics appnotesPage;

    @Self
    private LibraryPageAnalytics libraryPage;

    @Inject
    private PageDecorator currentPage;

    public String getJsonData() throws JsonProcessingException {
        return Templates.isApplicationNotesPage(currentPage) ? MAPPER.writeValueAsString(appnotesPage) :
            MAPPER.writeValueAsString(libraryPage);
    }
}
