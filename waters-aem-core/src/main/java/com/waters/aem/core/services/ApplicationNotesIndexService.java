package com.waters.aem.core.services;

import com.icfolson.aem.library.api.page.PageDecorator;

/**
 * Service for indexing application note pages.
 */
public interface ApplicationNotesIndexService {

    /**
     * Find the corresponding application note page in the given language.
     *
     * @param currentPage current application note page
     * @param languageCode language to find corresponding page with matching literature code
     * @return application page in given language or null if it does not exist
     */
    PageDecorator getApplicationNotesPageForLanguage(PageDecorator currentPage, String languageCode);
}
