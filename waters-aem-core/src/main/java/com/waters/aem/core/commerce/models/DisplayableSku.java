package com.waters.aem.core.commerce.models;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.AssetUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.List;
import java.util.Objects;
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

    @JsonIgnore
    public Sku getSku() {
        return sku;
    }

    public String getSkuPageHref() {
        final PageDecorator skuPage = sku.getSkuPage(siteContext.getPage());

        return skuPage != null ? skuPage.getHref() : "";
    }

    public String getCode() {
        return sku.getCode();
    }

    public String getTitle() {
        return sku.getTitle();
    }

    @JsonIgnore
    public boolean isActive() {
        return sku.getSalesStatus() == SkuSalesStatus.Active && !sku.isTerminated();
    }

    public String getFormattedPrice() {
        final BigDecimal price = getPrice();

        return price == null ? null : NumberFormat.getCurrencyInstance(siteContext.getLocaleWithCountry()).format(price);
    }

    @SuppressWarnings("squid:S2259")
    @JsonIgnore
    public String getPrimaryImageSrc() {
        return getPrimaryImageAsset() == null ? null : getPrimaryImageAsset().getPath();
    }

    public String getPrimaryImageAlt() {
        return getPrimaryImageAsset() == null ? "" : AssetUtils.getAltText(getPrimaryImageAsset());
    }

    public String getPrimaryImageThumbnail() {
        return getPrimaryImageAsset() == null ? null : new PrefixRenditionPicker(WatersConstants.THUMBNAIL_RENDITION_PREFIX, true)
            .getRendition(getPrimaryImageAsset())
            .getPath();
    }

    @JsonIgnore
    public BigDecimal getPrice() {
        final String country = siteContext.getLocaleWithCountry().getCountry();
        final String currencyIsoCode = siteContext.getCurrencyIsoCode();

        return sku.getPrice(country, currencyIsoCode);
    }

    @JsonIgnore
    public String getReplacementSkuCode() {
        return sku.getReplacementSkus().stream()
                .findFirst()
                .map(Sku :: getCode)
                .orElse(null);
    }

    public String getReplacementSkuPageHref() {
        PageDecorator skuPage = null;

        final String replacementSkuCode = getReplacementSkuCode();

        if (StringUtils.isNotEmpty(replacementSkuCode)) {
            skuPage = sku.getSkuPage(siteContext.getPage(), replacementSkuCode);
        }

        return skuPage != null ? skuPage.getHref() : "";
    }

    @JsonIgnore
    private Asset getPrimaryImageAsset() {
        final List<Asset> assets = getAssets();

        return assets.isEmpty() ? null : assets.get(0);
    }

    @JsonIgnore
    private List<Asset> getAssets() {

        final List<SkuImage> skuImages = sku.getImages();

        final List<Asset> assets = skuImages
                .stream()
                .map(skuImage -> AssetUtils.getAsset(resource.getResourceResolver(), skuImage.getPath()))
                .collect(Collectors.toList());

        return assets.stream().filter(Objects :: nonNull).collect(Collectors.toList());
    }
}
