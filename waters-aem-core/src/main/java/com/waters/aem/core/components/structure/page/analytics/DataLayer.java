package com.waters.aem.core.components.structure.page.analytics;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.components.structure.page.analytics.impl.AnalyticsPageImpl;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class DataLayer {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Self
    private AnalyticsPageImpl analyticsPage;

    public String getJsonData() throws JsonProcessingException {
        return MAPPER.writeValueAsString(analyticsPage);
    }
}
