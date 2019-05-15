package com.waters.aem.core.commerce.models;

import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Sku {

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_AVAILABLE_FOR_PICKUP)
    private Boolean availableForPickup;

    private String[] categories;

    // private List<Classification> classifications;

    // private List<Image> images;

    // private List<Promotion> promotions;

    private String baseProduct;

    private String code;

    private String manufacturer;

    private String description;

    private String name;

    private Integer numberOfReviews;

    // private Price price;

    private Boolean proprietary;

    private Boolean purchasable;

    private String salesStatus;

    // private Stock stock;

    private String summary;

    private Boolean terminated;

    private String url;

    public Boolean isAvailableForPickup() {
        return availableForPickup;
    }
}
