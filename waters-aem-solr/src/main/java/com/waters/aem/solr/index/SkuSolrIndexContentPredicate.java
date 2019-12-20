package com.waters.aem.solr.index;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;

@Model(adaptables = PageDecorator.class)
public class SkuSolrIndexContentPredicate implements SolrIndexContentPredicate {

    private static final Logger LOG = LoggerFactory.getLogger(SkuSolrIndexContentPredicate.class);

    @OSGiService
    private SkuRepository skuRepository;

    @Override
    public boolean isIndexed(final PageDecorator page) {
        boolean indexed = false;

        final Sku sku = skuRepository.getSku(page);

        if (sku != null) {
            final SiteContext siteContext = page.getContentResource().adaptTo(SiteContext.class);
            final String country = siteContext.getLocaleWithCountry().getCountry();

            final BigDecimal price = sku.getPrice(country, siteContext.getCurrencyIsoCode());

            if (price != null || indexGlobalExperienceSku(page, sku)) {
                indexed = true;
            } else {
                indexed = false;

                LOG.info("no price for sku {} in country {}, skipping indexing", sku.getCode(), country);
            }
        }

        return indexed;
    }

    /**
     * Checks if the provided page represents a global experience page ("XG"). Also checks if we have a default
     * price (US-USD) for the provided sku.
     *
     * @param page page to determine if this is a global experience sku
     * @param sku used to lookup a default price
     * @return true if this sku should be indexed based on the above criteria
     */
    private boolean indexGlobalExperienceSku(final PageDecorator page, final Sku sku) {
        // check if a US price exists for this global sku page.
        final BigDecimal defaultPrice = sku.getPrice("US", "USD");

        if (WatersConstants.PREDICATE_GLOBAL_EXP_PAGE.apply(page) && defaultPrice == null) {
            LOG.debug("no default price (US) for XG sku {}", sku.getCode());
        }

        return defaultPrice != null && WatersConstants.PREDICATE_GLOBAL_EXP_PAGE.apply(page);
    }
}
