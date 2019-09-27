package com.waters.aem.core.components.structure.page.analytics;

import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductData {

    @Inject
    private Sku sku;

    @Self
    SiteContext siteContext;

    public List<Map<String, Object>> getProducts() {
        List<Map<String, Object>> productList = sku.getRelatedSkus().stream()
        .map(relatedSku -> getProductProperties(relatedSku))
        .collect(Collectors.toList());

        productList.add(0, getProductProperties(sku));

        return  productList;
    }

    public Map<String, Object> getProductProperties(final Sku sku) {
        final Map<String, Object> properties = new HashMap<>();

        properties.put("name", sku.getTitle());
        properties.put("price", getPrice());
        properties.put("sku", sku.getCode());

        return properties;

    }

    public String getPrice() {
        final BigDecimal price = sku.getPrice(siteContext.getLocaleWithCountry().getCountry(), siteContext
        .getCurrencyIsoCode());

        return  price == null ? null : NumberFormat.getCurrencyInstance(siteContext.getLocaleWithCountry()).format(price);
    }

}
