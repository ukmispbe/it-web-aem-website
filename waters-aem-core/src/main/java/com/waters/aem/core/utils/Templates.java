package com.waters.aem.core.utils;

import com.day.cq.wcm.api.NameConstants;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;

/**
 * Page and template-related utility functions.
 */
public final class Templates {

    /**
     * Check if the given page is an application notes page.
     *
     * @param page page
     * @return true if page is non-null and is an application notes template
     */
    public static boolean isApplicationNotesPage(final PageDecorator page) {
        return page != null && WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(page.getTemplatePath());
    }

    /**
     * Check if the given content resource is an application notes page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is an application notes template
     */
    public static boolean isApplicationNotesPage(final Resource resource) {
        return resource != null && WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(
            resource.getValueMap().get(NameConstants.PN_TEMPLATE, ""));
    }

    private Templates() {

    }
}
