package com.waters.aem.solr.index.builder;

import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.models.annotations.Model;
import org.apache.solr.common.SolrInputDocument;

@Model(adaptables = PageDecorator.class)
public final class DefaultSolrInputDocumentBuilder extends AbstractSolrInputDocumentBuilder {

    @Override
    protected void addFields(final SolrInputDocument document) {

    }
}
