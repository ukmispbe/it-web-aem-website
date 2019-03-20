package com.waters.aem.solr.index.builder;

import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.utils.SearchUtils;
import org.apache.sling.models.annotations.Model;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Model(adaptables = PageDecorator.class)
public final class ApplicationNotesSolrInputDocumentBuilder extends AbstractSolrInputDocumentBuilder {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationNotesSolrInputDocumentBuilder.class);

    @Override
    protected void addFields(final SolrInputDocument document) {
        // get the application notes properties for the current page
        final ApplicationNotes applicationNotes = page.getContentResource().adaptTo(ApplicationNotes.class);

        // add literature code
        document.setField("literaturecode", applicationNotes.getLiteratureCode());

        // add application notes facets
        addFacets(document, applicationNotes);

        // add date
        addDate(document, applicationNotes);
    }

    private void addFacets(final SolrInputDocument document, final ApplicationNotes applicationNotes) {
        // get the locale from the current page
        final Locale locale = page.getLanguage(false);

        // get all application notes tags and group by their parent tag name, which maps to the facet field name
        final Map<String, List<Tag>> groupedTags = applicationNotes.getAllTags().stream()
            .collect(Collectors.groupingBy(tag -> tag.getParent().getName()));

        for (final Map.Entry<String, List<Tag>> entry : groupedTags.entrySet()) {
            final String fieldName = SearchUtils.getSolrFacetName(entry.getKey());

            LOG.info("adding facet with field name : {} and {} values", fieldName, entry.getValue().size());

            for (final Tag tag : entry.getValue()) {
                document.addField(fieldName, tag.getTitle(locale));
            }
        }
    }

    private void addDate(final SolrInputDocument document, final ApplicationNotes applicationNotes) {
        if (!applicationNotes.getYearPublished().isEmpty()) {
            final Tag yearPublished = applicationNotes.getYearPublished().get(0);

            final int year = Integer.valueOf(yearPublished.getName());
            final int month;

            if (!applicationNotes.getMonthPublished().isEmpty()) {
                final Tag monthPublished = applicationNotes.getMonthPublished().get(0);

                month = Month.valueOf(monthPublished.getName().toUpperCase()).getValue();
            } else {
                // default month if not authored
                month = 1;
            }

            final Instant date = LocalDateTime.of(year, month, 1, 0, 0).toInstant(ZoneOffset.UTC);

            document.setField("datepublished", DateTimeFormatter.ISO_INSTANT.format(date));
        }
    }
}