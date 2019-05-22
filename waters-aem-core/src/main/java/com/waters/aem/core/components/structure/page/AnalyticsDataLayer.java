package com.waters.aem.core.components.structure.page;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnalyticsDataLayer {

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ContentClassification contentClassification;

    public ContentClassification setContentClassification() {
        return contentClassification = Templates.isApplicationNotesPage(currentPage) ? new ApplicationNotes() : new LibraryPage();
    }


}
