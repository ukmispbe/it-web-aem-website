package com.waters.aem.core.components.structure.page.analytics.impl;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.waters.aem.core.components.structure.page.analytics.AnalyticsPage;
import com.waters.aem.core.components.structure.page.analytics.DocumentObjectData;
import com.waters.aem.core.components.structure.page.analytics.PageObjectData;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonPropertyOrder({"document", "page"})
public class AnalyticsPageImpl implements AnalyticsPage{

    @Self
    private PageObjectData pageObjectData;

    @Self
    private DocumentObjectData documentObjectData;

    @Override
    public DocumentObjectData getDocument() {
        return documentObjectData;
    }

    @Override
    public PageObjectData getPage() {
        return pageObjectData;
    }
}
