package com.waters.aem.core.commerce.models;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Objects;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.services.SkuRepository;
import org.apache.commons.lang3.EnumUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@SuppressWarnings({ "squid:HiddenFieldCheck" })
public final class Sku {

    @OSGiService
    private SkuRepository skuRepository;

    @Self
    private Resource resource;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CODE)
    private String code;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CATEGORIES)
    private String[] categories;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_SHORT_DESCRIPTION)
    private String shortDescription;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_LONG_DESCRIPTION)
    private String longDescription;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_NAME)
    private String title;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_PROPRIETARY)
    private Boolean proprietary;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_TERMINATED)
    private Boolean terminated;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_SALES_STATUS)
    private String salesStatus;

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

    public String getCode() {
        return code;
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

    public SkuSalesStatus getSalesStatus() {
        return EnumUtils.isValidEnum(SkuSalesStatus.class, salesStatus) ? SkuSalesStatus.valueOf(salesStatus) : null;
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

    public List<SkuImage> getImages() {
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_IMAGES,
            resource -> true,
            resource -> resource.adaptTo(SkuImage.class));
    }

    public List<Sku> getRelatedSkus() {
        // TODO do we need to check the 'terminated' property?
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_PRODUCT_REFERENCES,
            resource -> !resource.getValueMap().get(WatersCommerceConstants.PROPERTY_PROPRIETARY, false),
            resource -> skuRepository.getRelatedSku(resource));
    }

    public List<Classification> getClassifications() {
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_CLASSIFICATIONS,
                resource -> true,
                resource -> resource.adaptTo(Classification.class));
    }

    private <T> List<T> getResourceModels(final String resourceName,
                                                final Predicate<Resource> resourceFilter,
                                                final Function<Resource, T> resourceToModelFunction) {
        return Optional.ofNullable(resource.getChild(resourceName))
            .map(modelsResource -> StreamSupport.stream(modelsResource.getChildren().spliterator(), false)
                    .filter(resourceFilter)
                    .map(resourceToModelFunction)
                    .filter(java.util.Objects :: nonNull)
                    .collect(Collectors.toList()))
            .orElse(Collections.emptyList());
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
