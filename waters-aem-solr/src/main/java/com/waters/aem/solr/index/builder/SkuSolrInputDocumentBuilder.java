package com.waters.aem.solr.index.builder;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import java.util.Optional;

@Model(adaptables = PageDecorator.class)
public final class SkuSolrInputDocumentBuilder extends AbstractSolrInputDocumentBuilder {

    public static final String TAG_SHOP = "Shop";

    @OSGiService
    private SkuRepository skuRepository;

    @Override
    protected Optional<ContentClassification> getContentClassification() {
        return Optional.empty();
    }

    @Override
    protected Optional<Sku> getSku() {
        return Optional.ofNullable(skuRepository.getSku(page));
    }
}