package com.waters.aem.core.commerce.models;

import com.day.cq.commons.jcr.JcrConstants;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Arrays;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Sku {

    @Self
    private Resource resource;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_AVAILABLE_FOR_PICKUP)
    private Boolean availableForPickup;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CATEGORIES)
    private String[] categories;

    // private List<Classification> classifications;

    // private List<Image> images;

    // private List<Promotion> promotions;

    private String baseProduct;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CODE)
    private String code;

    private String manufacturer;

    @ValueMapValue(name = JcrConstants.JCR_DESCRIPTION)
    private String description;

    @ValueMapValue(name = JcrConstants.JCR_TITLE)
    private String title;

    private Integer numberOfReviews;

    // private Price price;

    private Boolean proprietary;

    private Boolean purchasable;

    private String salesStatus;

    // private Stock stock;

    private String summary;

    private Boolean terminated;

    private String url;

    public String getPath() {
        return resource.getPath();
    }

    public List<String> getCategories() {
        return Arrays.asList(categories);
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public Boolean isAvailableForPickup() {
        return availableForPickup;
    }
}
