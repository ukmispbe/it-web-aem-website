package com.waters.aem.solr.index.builder;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.models.annotations.Model;

import java.util.Optional;

@Model(adaptables = PageDecorator.class)
public final class ApplicationNotesSolrInputDocumentBuilder extends AbstractSolrInputDocumentBuilder {

    @Override
    protected Optional<ContentClassification> getContentClassification() {
        return Optional.ofNullable(page.getContentResource().adaptTo(ApplicationNotes.class));
    }
}