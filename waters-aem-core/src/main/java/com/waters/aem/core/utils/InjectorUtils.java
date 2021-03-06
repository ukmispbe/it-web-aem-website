package com.waters.aem.core.utils;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

/**
 * Utilities for Sling model injectors.
 */
public final class InjectorUtils {

    public static SlingHttpServletRequest getRequest(final Object adaptable) {
        SlingHttpServletRequest request = null;

        if (adaptable instanceof SlingHttpServletRequest) {
            request = (SlingHttpServletRequest) adaptable;
        }

        return request;
    }

    public static Resource getResource(final Object adaptable) {
        Resource resource = null;

        if (adaptable instanceof SlingHttpServletRequest) {
            resource = ((SlingHttpServletRequest) adaptable).getResource();
        } else if (adaptable instanceof Resource) {
            resource = (Resource) adaptable;
        }

        return resource;
    }

    private InjectorUtils() {

    }
}
