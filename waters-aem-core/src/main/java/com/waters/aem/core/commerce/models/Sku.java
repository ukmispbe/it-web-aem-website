package com.waters.aem.core.commerce.models;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Objects;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Sku {

    @Self
    private Resource resource;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_SKU_ID)
    private String id;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CATEGORIES)
    private String[] categories;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_SHORT_DESCRIPTION)
    private String shortDescription;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_LONG_DESCRIPTION)
    private String longDescription;

    @ValueMapValue(name = JcrConstants.JCR_TITLE)
    private String title;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_PROPRIETARY)
    private Boolean proprietary;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_PROPRIETARY)
    private Boolean terminated;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_COLD_STORAGE)
    private Boolean coldStorage;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_HAZARDOUS_HANDLING)
    private Boolean hazardousHandling;

    @ValueMapValue(name = JcrConstants.JCR_LASTMODIFIED)
    private Calendar lastModified;

    public String getPath() {
        return resource.getPath();
    }

    public List<String> getCategories() {
        return Arrays.asList(categories);
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public Boolean isProprietary() {
        return proprietary;
    }

    public Boolean isTerminated() {
        return terminated;
    }

    public Boolean isColdStorage() {
        return coldStorage;
    }

    public Boolean isHazardousHandling() {
        return hazardousHandling;
    }

    public Calendar getLastModified() {
        return lastModified;
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
