package com.waters.aem.core.services;

import java.util.List;

/**
 * Configuration specification for page event handlers.
 */
public interface PageEventHandlerConfiguration {

    /**
     * Get the configured list of included paths.
     *
     * @return included paths
     */
    List<String> getIncludedPaths();

    /**
     * Get the configured list of excluded paths.
     *
     * @return excluded paths
     */
    List<String> getExcludedPaths();

    /**
     * Determine if the given path is included according to the configured rules.
     *
     * @param path page/asset path
     * @return true if path is included
     */
    default boolean isIncludedPath(final String path) {
        boolean isIncluded = getIncludedPaths().stream().anyMatch(path :: startsWith);

        if (isIncluded) {
            isIncluded = getExcludedPaths().stream().noneMatch(path :: startsWith);
        }

        return isIncluded;
    }
}
