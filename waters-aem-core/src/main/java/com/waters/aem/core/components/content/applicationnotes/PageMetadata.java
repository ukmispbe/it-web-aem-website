package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.tagging.WatersTagInject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class PageMetadata {

    private static final Logger LOG = LoggerFactory.getLogger(PageMetadata.class);

    @Inject
    private ContentClassification contentClassification;

    @DialogField(fieldLabel = "Tags",
        fieldDescription = "Select the Tags",
        ranking = 2)
    @TagInputField
    @WatersTagInject
    private List<Tag> tags = Collections.emptyList();

    protected List<Tag> getTags() {
        return tags;
    }

    protected List<Tag> getSearchTags() {
        final List<Tag> pageMetadataTags = contentClassification.getAllTags();

        LOG.debug("selected tags : {}, page tags : {}", getTagTitles(tags), getTagTitles(pageMetadataTags));

        final List<Tag> searchTags = new ArrayList<>();

        for (final Tag tag : tags) {
            final List<Tag> pageTags = pageMetadataTags
                .stream()
                .filter(pageTag -> pageTag.getParent().getName().equalsIgnoreCase(tag.getName()))
                .collect(Collectors.toList());

            searchTags.addAll(pageTags);
        }

        LOG.debug("search tags : {}", getTagTitles(searchTags));

        return searchTags;
    }

    protected ContentClassification getContentClassification() {
        return contentClassification;
    }

    private List<String> getTagTitles(final List<Tag> tags) {
        return tags.stream()
            .map(Tag :: getTitle)
            .collect(Collectors.toList());
    }
}
