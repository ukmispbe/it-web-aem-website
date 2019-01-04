package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

@Component("Search Results")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResults {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Inject
    private PageDecorator currentPage;

    @Inject
    private TagManager tagManager;

    public String getTagsAsJson() throws JsonProcessingException {
        final Map<String, String> tagIdsToLocalizedTitles = new HashMap<>();

        final Locale locale = currentPage.getLanguage(false);

        for (final Tag namespace : tagManager.getNamespaces()) {
            final Iterator<Tag> tagsForNamespace = namespace.listAllSubTags();

            while (tagsForNamespace.hasNext()) {
                final Tag tag = tagsForNamespace.next();

                tagIdsToLocalizedTitles.put(tag.getTagID(), tag.getTitle(locale));
            }
        }

        return MAPPER.writeValueAsString(tagIdsToLocalizedTitles);
    }
}
