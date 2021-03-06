package com.waters.aem.core.commerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.AssetUtils;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A helper class for a Sku used to display Sku information on the page.
 */
public final class DisplayableSku {

    private Sku sku;
    private SiteContext siteContext;

    public DisplayableSku(Sku sku, SiteContext siteContext) {
        this.sku = checkNotNull(sku);
        this.siteContext = checkNotNull(siteContext);
    }

    @JsonIgnore
    public Sku getSku() {
        return sku;
    }

    public String getSkuPageHref() {
        final PageDecorator skuPage = sku.getSkuPage(siteContext.getPage());

        return skuPage != null ? skuPage.getHref(true) : "";
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
        final String currencyCode = sku.getCurrencyCode(siteContext.getLocaleWithCountry().getCountry(),
                siteContext.getCurrencyIsoCode());

        return price == null ? null : formatCurrencyValueFromSAP(currencyCode, price) + " " + currencyCode;
    }

    private String formatCurrencyValueFromSAP(String currencyCode , BigDecimal currency) {
        final String currencyFormat = WatersConstants.CURRENCY_FORMATS.getOrDefault(currencyCode, "#,##0.00");

        DecimalFormat format = new DecimalFormat(currencyFormat);
        return format.format(currency);
    }

    public String getPrimaryImageAlt() {
        return sku.getPrimaryImageAsset() == null ? "" : AssetUtils.getAltText(sku.getPrimaryImageAsset());
    }

    public String getPrimaryImageThumbnail() {
        return sku.getPrimaryImageThumbnail();
    }

    @JsonIgnore
    public String getLongDescription() {
        return sku.getLongDescription();
    }

    @JsonIgnore
    public List<Classification> getSpecifications() {
        return sku == null ?  Collections.emptyList() : sku.getClassifications()
            .stream()
            .filter(classification -> !classification.getCode().contains(WatersCommerceConstants.COLD_CHAIN_SHIPPING_CODE) &&
            !classification.getCode().contains(WatersCommerceConstants.HAZARDOUS_CODE))
            .collect(Collectors.toList());
    }

    @JsonIgnore
    public List<String> getCategories() {
        return sku.getCategories();
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

        return skuPage != null ? skuPage.getHref(true) : "";
    }
}
