package com.waters.aem.core.components.structure.page.analytics.impl;

import com.waters.aem.core.components.structure.page.analytics.AbstractAnalyticsModel;
import com.waters.aem.core.components.structure.page.analytics.AnalyticsPage;
import com.waters.aem.core.components.structure.page.analytics.DocumentObjectData;
import com.waters.aem.core.components.structure.page.analytics.PageObjectData;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotesPageAnalytics extends AbstractAnalyticsModel implements AnalyticsPage {

    @Self
    private PageObjectData pageObjectData;

    @Self
    private DocumentObjectData documentObjectData;

    @Override
    public PageObjectData getPage() {
        return pageObjectData;
    }

    @Override
    public DocumentObjectData getDocument() {
        return documentObjectData;
    }

}
