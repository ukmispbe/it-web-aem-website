package com.waters.aem.solr.index.builder.impl;

import com.day.cq.commons.Externalizer;
import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.solr.index.builder.SolrInputDocumentBuilder;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;

public abstract class AbstractSolrInputDocumentBuilder implements SolrInputDocumentBuilder {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractSolrInputDocumentBuilder.class);

    @Self
    protected PageDecorator page;

    @Inject
    private Externalizer externalizer;

    public final SolrInputDocument build() {
        final SolrInputDocument document = new SolrInputDocument();

        // add common fields for all page types
        document.addField("id", page.getPath());
        document.addField("url", externalizer.externalLink(page.getContentResource().getResourceResolver(),
            Externalizer.PUBLISH, page.getHref()));
        document.addField("title", page.getTitle());
        document.addField("description", page.getDescription());
        document.addField("isocode", page.getLanguage(false).toString());
        document.addField("viewname", "aem");

        // TODO confirm tag translation strategy
        for (final Tag tag : page.getTags()) {
            document.addField("tags", tag.getTagID());
        }

        // document.addField("category_facet", "");

        addFields(document);

        LOG.info("created solr input document : {}", document);

        return document;
    }

    protected abstract void addFields(SolrInputDocument document);
}
