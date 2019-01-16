package com.waters.aem.core.components.content;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import org.apache.sling.api.resource.ValueMap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class PageMetaDataExtractor {

    public static List<Tag> getSearchTags(TagManager tagManager,ValueMap valueMap,List<Tag> tags) {
        final List<Tag> searchTags = new ArrayList<>();
        for (Tag tag : tags) {
            final List<Tag> pageTags = valueMap.keySet()
                    .stream()
                    .filter(propertyName -> propertyName.equalsIgnoreCase(tag.getName()))
                    .findFirst()
                    .map(propertyName -> valueMap.get(propertyName, new String[0])) // get tag IDs from value map
                    .map(tagIdsForProperty -> Stream.of(
                            tagIdsForProperty) // create a new stream from tag IDs and transform to tag objects
                            .map(tagManager::resolve)
                            .filter(Objects::nonNull)
                            .collect(Collectors.toList()))
                    .orElse(Collections.emptyList()); // return empty list by default

            searchTags.addAll(pageTags);
        }
        return searchTags;
    }
}
