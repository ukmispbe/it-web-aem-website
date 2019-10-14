package com.waters.aem.solr.index;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.SiteContext;
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

            if (price != null) {
                indexed = true;
            } else {
                indexed = false;

                LOG.info("no price for sku {} in country {}, skipping indexing", sku.getCode(), country);
            }
        }

        return indexed;
    }
}
