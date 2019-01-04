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
        final ApplicationNotes applicationNotes = page.getContentResource().adaptTo(ApplicationNotes.class);

        document.setField("literaturecode", applicationNotes.getLiteratureCode());

        // TODO: determine if we are sending tag IDs or titles to solr depending on translation strategy
        for (final Tag technique : applicationNotes.getTechnique()) {
            document.addField("technique_facet", technique.getTagID());
        }

        for (final Tag instrumentType : applicationNotes.getInstrumentType()) {
            document.addField("instrumenttype_facet", instrumentType.getTagID());
        }

        for (final Tag separationMode : applicationNotes.getSeparationMode()) {
            document.addField("separationmode_facet", separationMode.getTagID());
        }

        for (final Tag compoundClass : applicationNotes.getCompoundClass()) {
            document.addField("compoundclass_facet", compoundClass.getTagID());
        }

        for (final Tag columnType : applicationNotes.getColumnType()) {
            document.addField("columntype_facet", columnType.getTagID());
        }

        for (final Tag chromatographySoftware : applicationNotes.getChromatographySoftware()) {
            document.addField("chromsoftware_facet", chromatographySoftware.getTagID());
        }

        for (final Tag market : applicationNotes.getMarket()) {
            document.addField("market_facet", market.getTagID());
        }

        /*
        document.addField("yearpublished", "");
        */
    }
}
