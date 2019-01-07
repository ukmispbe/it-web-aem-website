package com.waters.aem.solr.index.builder;

import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import org.apache.sling.models.annotations.Model;
import org.apache.solr.common.SolrInputDocument;

@Model(adaptables = PageDecorator.class)
public final class ApplicationNotesSolrInputDocumentBuilder extends AbstractSolrInputDocumentBuilder {

    @Override
    protected void addFields(final SolrInputDocument document) {
        // get the application notes properties for the current page
        final ApplicationNotes applicationNotes = page.getContentResource().adaptTo(ApplicationNotes.class);

        // add literature code
        document.setField("literaturecode", applicationNotes.getLiteratureCode());

        // add application notes facets
        addFacets(document, applicationNotes);

        // add year
        if (!applicationNotes.getYearPublished().isEmpty()) {
            final Tag yearPublished = applicationNotes.getYearPublished().get(0);

            // single-valued field
            document.setField("yearpublished_facet", yearPublished.getTagID());
        }
    }

    private void addFacets(final SolrInputDocument document, final ApplicationNotes applicationNotes) {
        // TODO: determine if we are sending tag IDs or titles to solr depending on translation strategy
        for (final Tag author : applicationNotes.getAuthor()) {
            document.addField("author", author.getTagID());
        }

        for (final Tag technique : applicationNotes.getTechnique()) {
            document.addField("technique_facet", technique.getTagID());
        }

        for (final Tag instrumentType : applicationNotes.getInstrumentType()) {
            document.addField("instrumenttype_facet", instrumentType.getTagID());
        }

        for (final Tag separationMode : applicationNotes.getSeparationMode()) {
            document.addField("separationmode_facet", separationMode.getTagID());
        }

        for (final Tag compoundMatrix : applicationNotes.getCompoundMatrix()) {
            document.addField("compoundmatrix_facet", compoundMatrix.getTagID());
        }

        for (final Tag columnType : applicationNotes.getColumnType()) {
            document.addField("columntype_facet", columnType.getTagID());
        }

        for (final Tag software : applicationNotes.getSoftware()) {
            document.addField("software_facet", software.getTagID());
        }

        for (final Tag market : applicationNotes.getMarket()) {
            document.addField("market_facet", market.getTagID());
        }
    }
}
