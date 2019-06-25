package com.waters.aem.core.commerce.models;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;

import java.math.BigDecimal;
import java.util.Currency;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A helper class for a Sku used to display Sku information on the page.
 */
public final class DisplayableSku {

    private Sku sku;
    private Resource resource;
    private SiteContext siteContext;

    public DisplayableSku(Sku sku, Resource resource, SiteContext siteContext) {
        this.sku = checkNotNull(sku);
        this.resource = checkNotNull(resource);
        this.siteContext = checkNotNull(siteContext);
    }

    public Sku getSku() {
        return sku;
    }

    public String getCode() {
        return sku.getCode();
    }

    public String getTitle() {
        return sku.getTitle();
    }

    public boolean isActive() {
        return sku.getSalesStatus() == SkuSalesStatus.Active && !sku.isTerminated();
    }

    public String getCurrencySymbol() {
        final Locale locale = siteContext.getLocale();

        return Currency.getInstance(locale).getSymbol(locale);
    }

    public BigDecimal getPrice() {
        final String country = siteContext.getLocale().getCountry();
        final String currencyIsoCode = siteContext.getCurrencyIsoCode();

        return sku.getPrice(country, currencyIsoCode);
    }

    public String getPrimaryImageSrc() {
        return getPrimaryImageAsset() == null ? null : getPrimaryImageAsset().getPath();
    }

    public String getPrimaryImageAlt() {
        return getPrimaryImageAsset() == null ? "" : getAltText(getPrimaryImageAsset());
    }

    private Asset getPrimaryImageAsset() {
        final List<Asset> assets = getAssets();

        return assets.isEmpty() ? null : assets.get(0);
    }

    private List<Asset> getAssets() {

        final List<SkuImage> skuImages = sku.getImages();

        final List<Asset> assets = skuImages
                .stream()
                .map(skuImage -> getAsset(skuImage.getPath())).collect(Collectors.toList());

        return assets.stream().filter(Objects:: nonNull).collect(Collectors.toList());
    }

    private String getAltText(final Asset asset) {
        return Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_DESCRIPTION))
                .orElse(asset.getMetadataValue(DamConstants.DC_TITLE));
    }

    private Asset getAsset(final String fileReference) {
        final Resource assetResource = resource.getResourceResolver().getResource(fileReference);

        return assetResource == null ? null : assetResource.adaptTo(Asset.class);
    }
}
