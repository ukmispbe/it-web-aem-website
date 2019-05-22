package com.waters.aem.core.components.structure.page;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class AnalyticsData {

    @Self
    private AnalyticsPageData pageData;

    @Self
    private AnalyticsDocumentData documentData;

    public AnalyticsPageData getPage() {
        return pageData;
    }

    public AnalyticsDocumentData getDocument() {
        return documentData;
    }
}
