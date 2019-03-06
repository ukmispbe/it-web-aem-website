package com.waters.aem.core.utils;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;

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

    private Templates() {

    }
}
