package com.waters.aem.core.components.structure.page.analytics;

import com.day.cq.commons.Externalizer;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Classification;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.SkuImage;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.settings.SlingSettingsService;
import javax.inject.Inject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductData {

    @Inject
    private Sku sku;
    
    @Inject
    private PageDecorator currentPage;
    
    @Self
    private SiteContext siteContext;
    
    @Inject
    private Externalizer externalizer;
    
    @OSGiService
    private SlingSettingsService settingsService;
    
    @Self
    private Resource resource;
    
    private String thumbnailRendition = "/jcr:content/renditions/cq5dam.thumbnail.319.319.png";

    public List<Map<String, Object>> getProducts() {
        final List<Map<String, Object>> productList = new ArrayList<>();

        if (sku != null) {
            // add current sku
            productList.add(getProductProperties(sku));

            // add related skus
            productList.addAll(sku.getRelatedSkus(siteContext).stream()
                .map(this::getProductProperties)
                .collect(Collectors.toList()));
        }

        return productList;
    }

    private Map<String, Object> getProductProperties(final Sku sku) {
        final Map<String, Object> properties = new HashMap<>();
        final DisplayableSku displayableSku = new DisplayableSku(sku, siteContext);
        
        properties.put("name", sku.getTitle());
        properties.put("listPrice", displayableSku.getFormattedPrice());
        properties.put("value", displayableSku.getPrice().toString());
        properties.put("currencyCode", sku.getCurrencyCode(siteContext.getLocaleWithCountry().getCountry(), siteContext.getCurrencyIsoCode()));
        properties.put("sku", sku.getCode());
        properties.put("message", sku.getLongDescription());
		for (SkuImage skuImage : sku.getImages()) {
			if (sku.getImages().size() >= 1) {
				skuImage = sku.getImages().get(0);
				properties.put("thumbnailURL",
						externalize(skuImage.getUrl().substring(skuImage.getUrl().indexOf("/content")))
								+ thumbnailRendition);
			}
		}
        for(Classification classification : sku.getClassifications()) {
        	if(classification.getTitle().contains("Product Type")) {
        		properties.put("productType", classification.getFeatureValues()[0]);
        	}
        }
        properties.put("webCategory", sku.getCategories().get(0));
        properties.put("pageUrl", externalize(currentPage.getHref()));

        return properties;

    }
    
	private String externalize(final String path) {
		return externalizer.externalLink(resource.getResourceResolver(),
				settingsService.getRunModes().contains(Externalizer.PUBLISH) ? Externalizer.PUBLISH
						: Externalizer.AUTHOR,
				path);
	}
}
