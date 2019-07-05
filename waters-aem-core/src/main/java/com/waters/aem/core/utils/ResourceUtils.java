package com.waters.aem.core.utils;

import org.apache.sling.api.resource.Resource;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public final class ResourceUtils {

    public static <T> List<T> getResourceModels(final Resource resource, final String resourceName,
                                                final Predicate<Resource> resourceFilter,
                                                final Function<Resource, T> resourceToModelFunction) {
        return Optional.ofNullable(resource.getChild(resourceName))
                .map(modelsResource -> StreamSupport.stream(modelsResource.getChildren().spliterator(), false)
                        .filter(resourceFilter)
                        .map(resourceToModelFunction)
                        .filter(java.util.Objects :: nonNull)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    private ResourceUtils() {

    }
}
