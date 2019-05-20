package com.waters.aem.core.commerce.models;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.google.common.base.Objects;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_SUMMARY)
    private String summary;

    private Boolean terminated;

    private String url;

    @TagInject
    private List<Tag> tags = new ArrayList<>();

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

    public String getSummary() {
        return summary;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public String getTitle() {
        return title;
    }

    public Boolean isAvailableForPickup() {
        return availableForPickup;
    }

    public BigDecimal getPrice(final String country, final String currencyIso) {
        final String priceResourcePath = new StringBuilder(WatersCommerceConstants.RESOURCE_NAME_PRICES)
            .append("/")
            .append(currencyIso)
            .append("-")
            .append(country)
            .toString();

        return Optional.ofNullable(resource.getChild(priceResourcePath))
            .map(priceResource -> priceResource.getValueMap().get(WatersCommerceConstants.PROPERTY_VALUE,
                BigDecimal.class))
            .orElse(null);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
