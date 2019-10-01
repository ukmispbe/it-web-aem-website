package com.waters.aem.core.components.structure.page.analytics;

import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductData {

    @Inject
    private Sku sku;

    @Self
    private SiteContext siteContext;

    public List<Map<String, Object>> getProducts() {
        final List<Map<String, Object>> productList = Arrays.asList(getProductProperties(sku));

        productList.addAll(sku.getRelatedSkus().stream()
                .map(this::getProductProperties)
                .collect(Collectors.toList()));

        return productList;
    }

    private Map<String, Object> getProductProperties(final Sku sku) {
        final Map<String, Object> properties = new HashMap<>();
        final DisplayableSku displayableSku = new DisplayableSku(sku, siteContext);

        properties.put("name", sku.getTitle());
        properties.put("price", displayableSku.getFormattedPrice());
        properties.put("sku", sku.getCode());

        return properties;

    }
}
