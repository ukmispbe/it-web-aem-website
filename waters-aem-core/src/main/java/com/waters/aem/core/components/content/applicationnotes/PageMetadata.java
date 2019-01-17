package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.models.annotations.TagInject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class PageMetadata {

    @Inject
    private TagManager tagManager;

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Tags",
        fieldDescription = "Select the Tags",
        ranking = 2)
    @TagInputField
    @TagInject
    private List<Tag> tags = Collections.emptyList();

    protected List<Tag> getTags() {
        return tags;
    }

    protected List<Tag> getSearchTags() {
        final List<Tag> searchTags = new ArrayList<>();

        final ValueMap properties = currentPage.getProperties();

        for (final Tag tag : tags) {
            final List<Tag> pageTags = properties.keySet()
                .stream()
                .filter(propertyName -> propertyName.equalsIgnoreCase(tag.getName()))
                .findFirst()
                .map(propertyName -> properties.get(propertyName, new String[0])) // get tag IDs from value map
                .map(tagIdsForProperty -> Stream.of(
                    tagIdsForProperty) // create a new stream from tag IDs and transform to tag objects
                    .map(tagManager :: resolve)
                    .filter(Objects :: nonNull)
                    .collect(Collectors.toList()))
                .orElse(Collections.emptyList()); // return empty list by default

            searchTags.addAll(pageTags);
        }

        return searchTags;
    }
}
