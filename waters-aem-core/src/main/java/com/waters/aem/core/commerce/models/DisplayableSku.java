package com.waters.aem.core.commerce.models;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.AssetUtils;
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

    public Sku getSku() {
        return sku;
    }

    public String getSkuPageHref() {
        return sku.getSkuPage(siteContext.getPage()).getHref();
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

    public String getFormattedPrice() {
        final BigDecimal price = getPrice();

        return price == null ? null : NumberFormat.getCurrencyInstance(siteContext.getLocaleWithCountry()).format(price);
    }

    @SuppressWarnings("squid:S2259")
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

    public BigDecimal getPrice() {
        final String country = siteContext.getLocaleWithCountry().getCountry();
        final String currencyIsoCode = siteContext.getCurrencyIsoCode();

        return sku.getPrice(country, currencyIsoCode);
    }

    public String getReplacementSkuCode() {
        return sku.getReplacementSkus().stream()
                .findFirst()
                .map(Sku :: getCode)
                .orElse(null);
    }

    private Asset getPrimaryImageAsset() {
        final List<Asset> assets = getAssets();

        return assets.isEmpty() ? null : assets.get(0);
    }

    private List<Asset> getAssets() {

        final List<SkuImage> skuImages = sku.getImages();

        final List<Asset> assets = skuImages
                .stream()
                .map(skuImage -> AssetUtils.getAsset(resource.getResourceResolver(), skuImage.getPath()))
                .collect(Collectors.toList());

        return assets.stream().filter(Objects :: nonNull).collect(Collectors.toList());
    }
}
