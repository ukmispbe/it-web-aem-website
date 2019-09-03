package com.waters.aem.solr.index.builder;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.models.annotations.Model;

import java.util.Optional;

@Model(adaptables = PageDecorator.class)
public final class DefaultSolrInputDocumentBuilder extends AbstractSolrInputDocumentBuilder {

    @Override
    protected Optional<ContentClassification> getContentClassification() {
        return Optional.empty();
    }

    @Override
    protected Optional<Sku> getSku() {
        return Optional.empty();
    }
}