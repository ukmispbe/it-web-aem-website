package com.waters.aem.core.commerce.models;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Objects;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.services.SkuRepository;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Sku {

    @OSGiService
    private SkuRepository skuRepository;

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

    public List<SkuImage> getImages() {
        final List<SkuImage> images = new ArrayList<>();

        final Resource imagesResource = resource.getChild(WatersCommerceConstants.RESOURCE_NAME_IMAGES);

        if (imagesResource != null) {
            for (final Resource imageResource : imagesResource.getChildren()) {
                images.add(imageResource.adaptTo(SkuImage.class));
            }
        }

        return images;
    }

    public List<Sku> getRelatedSkus() {
        final List<Sku> relatedSkus = new ArrayList<>();

        final Resource productReferencesResource = resource.getChild(
            WatersCommerceConstants.RESOURCE_NAME_PRODUCT_REFERENCES);

        if (productReferencesResource != null) {
            for (final Resource productReferenceResource : productReferencesResource.getChildren()) {
                final ValueMap properties = productReferenceResource.getValueMap();

                // TODO do we need to check the 'terminated' property?
                if (!properties.get(WatersCommerceConstants.PROPERTY_PROPRIETARY, false)) {
                    final String productCode = properties.get(WatersCommerceConstants.PROPERTY_SKU_ID, "");

                    final Sku relatedSku = skuRepository.getSku(resource.getResourceResolver(), productCode);

                    if (relatedSku != null) {
                        relatedSkus.add(relatedSku);
                    }
                }
            }
        }

        return relatedSkus;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
