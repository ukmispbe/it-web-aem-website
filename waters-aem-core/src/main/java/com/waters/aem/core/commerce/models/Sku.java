package com.waters.aem.core.commerce.models;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import com.google.common.base.Objects;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.AssetUtils;
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

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_COLD_CHAIN_SHIPPING)
    private Boolean coldChainShipping;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_HAZARDOUS)
    private Boolean hazardous;

    @ValueMapValue(name = JcrConstants.JCR_LASTMODIFIED)
    private Calendar lastModified;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_GTIN)
    private String gtin;
    
    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_UNSPSC)
    private String unspsc;

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

    public Boolean isColdChainShipping() {
        return coldChainShipping;
    }

    public Boolean isHazardous() {
        return hazardous;
    }

    public Calendar getLastModified() {
        return lastModified;
    }

    public String getGtin() {
        return gtin;
    }
    
    public String getUnspsc() {
        return unspsc;
    }

    public BigDecimal getPrice(final String country, final String currencyIso) {
        final String priceResourcePath = getPriceResourcePath(country, currencyIso);

        return Optional.ofNullable(resource.getChild(priceResourcePath))
            .map(priceResource -> priceResource.getValueMap().get(WatersCommerceConstants.PROPERTY_VALUE,
                BigDecimal.class))
            .orElse(null);
    }

    private String getPriceResourcePath(String country, String currencyIso) {
        return new StringBuilder(WatersCommerceConstants.RESOURCE_NAME_PRICES)
                .append("/")
                .append(currencyIso)
                .append("-")
                .append(country)
                .toString();
    }

    public List<SkuImage> getImages() {
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_IMAGES,
            resource -> true,
            resource -> resource.adaptTo(SkuImage.class));
    }

    /**
     * Gets the related skus for the current country, filtering out any skus that do not have a price for the current
     * country.
     *
     * @param siteContext site context containing current country information.
     * @return filtered related skus
     */
    public List<Sku> getRelatedSkus(final SiteContext siteContext) {
        final String country = siteContext.getLocaleWithCountry().getCountry();

        return getRelatedSkus().stream()
                .filter(sku -> sku.getPrice(country, siteContext.getCurrencyIsoCode()) != null)
                .collect(Collectors.toList());
    }

    public List<Sku> getReplacementSkus() {
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_PRODUCT_REFERENCES,
                resource -> !resource.getValueMap().get(WatersCommerceConstants.PROPERTY_PROPRIETARY, false) &&
                !resource.getValueMap().get(WatersCommerceConstants.PROPERTY_TERMINATED, false) &&
                    resource.getValueMap().get(WatersCommerceConstants.PROPERTY_PRODUCT_REFERENCE_TYPE).equals(SkuReferenceType.REPLACEMENT_PART.toString()),
                resource -> skuRepository.getRelatedSku(resource));
    }

    public List<Classification> getClassifications() {
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_CLASSIFICATIONS,
                resource -> true,
                resource -> resource.adaptTo(Classification.class));
    }

    public String getPrimaryImageThumbnail() {
        return getPrimaryImageAsset() == null ? null : new PrefixRenditionPicker(WatersConstants.THUMBNAIL_RENDITION_PREFIX, true)
            .getRendition(getPrimaryImageAsset())
            .getPath();
    }

    @SuppressWarnings({ "squid:S2259" })
    public String getPrimaryImageSrc() {
        final Asset primaryImageAsset = getPrimaryImageAsset();

        return primaryImageAsset == null ? null : primaryImageAsset.getPath();
    }

    public Asset getPrimaryImageAsset() {
        final List<Asset> assets = getAssets();

        return assets.isEmpty() ? null : assets.get(0);
    }

    /**
     * Delegates to SkuRepository to get the sku page for the current sku.
     */
    public PageDecorator getSkuPage(PageDecorator currentPage) {
        return skuRepository.getSkuPage(currentPage, getCode());
    }

    /**
     * Delegates to SkuRepository to get the sku page for any provided sku code.
     */
    public PageDecorator getSkuPage(PageDecorator currentPage, String code) {
        return skuRepository.getSkuPage(currentPage, code);
    }

    private List<Sku> getRelatedSkus() {
        return getResourceModels(WatersCommerceConstants.RESOURCE_NAME_PRODUCT_REFERENCES,
                resource -> !resource.getValueMap().get(WatersCommerceConstants.PROPERTY_PROPRIETARY, false) &&
                        !resource.getValueMap().get(WatersCommerceConstants.PROPERTY_TERMINATED, false) &&
                        resource.getValueMap().get(WatersCommerceConstants.PROPERTY_PRODUCT_REFERENCE_TYPE).equals(SkuReferenceType.OTHERS.toString()),
                resource -> skuRepository.getRelatedSku(resource));
    }

    private <T> List<T> getResourceModels(final String resourceName, final Predicate<Resource> resourceFilter,
        final Function<Resource, T> resourceToModelFunction) {
        return Optional.ofNullable(resource.getChild(resourceName))
            .map(modelsResource -> StreamSupport.stream(modelsResource.getChildren().spliterator(), false)
                .filter(resourceFilter)
                .map(resourceToModelFunction)
                .filter(java.util.Objects :: nonNull)
                .collect(Collectors.toList()))
            .orElse(Collections.emptyList());
    }

    private List<Asset> getAssets() {
        return getImages().stream()
            .map(skuImage -> AssetUtils.getAsset(resource.getResourceResolver(), skuImage.getPath()))
            .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }

    public String getCurrencyCode(String country, String currencyIsoCode) {
        return java.util.Objects.requireNonNull(resource.getChild(getPriceResourcePath(country, currencyIsoCode)))
                .getValueMap().get(WatersCommerceConstants.PROPERTY_CURRENCY_ISO, "USD");
    }
}
