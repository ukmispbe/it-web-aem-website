package com.waters.aem.core.components.structure.page.analytics;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class DataLayer {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Self
    private PageData pageData;

    @Self
    private DocumentData documentData;

    @Self
    private ProductData productData;

    @Inject
    private PageDecorator currentPage;

    private Map<String, Object> buildJson() {
        final Map<String, Object> properties = new HashMap<>();

        if (Templates.isSkuPage(currentPage)) {
            properties.put("page", pageData);
            properties.put("products", productData.getProducts());
        } else {
            properties.put("document", documentData);
            properties.put("page", pageData);
        }

        return properties;
    }

    public String getJsonData() throws JsonProcessingException {
        return MAPPER.writeValueAsString(buildJson());
    }
}
