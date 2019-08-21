package com.waters.aem.core.commerce.models;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import com.icfolson.aem.library.api.page.PageDecorator;
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
        return sku.getPrimaryImageSrc();
    }

    public String getPrimaryImageAlt() {
        return sku.getPrimaryImageAsset() == null ? "" : AssetUtils.getAltText(sku.getPrimaryImageAsset());
    }

    public String getPrimaryImageThumbnail() {
        return sku.getPrimaryImageThumbnail();
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

    public String getReplacementSkuPageHref() {
        final PageDecorator page = sku.getSkuPage(siteContext.getPage(), getReplacementSkuCode());

        return page != null ? page.getHref() : "";
    }
}
