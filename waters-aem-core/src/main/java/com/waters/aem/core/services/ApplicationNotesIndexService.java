package com.waters.aem.core.services;

import com.icfolson.aem.library.api.page.PageDecorator;

import java.util.List;

/**
 * Service for indexing application note pages.
 */
public interface ApplicationNotesIndexService {

    /**
     * Get a list of application notes pages for the given literature code.
     *
     * @param literatureCode literature code
     * @return list of pages or empty list if no matching pages are found
     */
    List<PageDecorator> getApplicationNotesPages(String literatureCode);

    /**
     * Get the application note page corresponding to the given literature code and language code.
     *
     * @param literatureCode literature code
     * @param languageCode language code from locale
     * @return application note page or null if it does not exist
     */
    PageDecorator getApplicationNotePage(String literatureCode, String languageCode);

    /**
     * Find the corresponding application note page in the given language.
     *
     * @param currentPage current application note page
     * @param languageCode language to find corresponding page with matching literature code
     * @return application note page in given language or null if it does not exist
     */
    PageDecorator getApplicationNotePageForLanguage(PageDecorator currentPage, String languageCode);
}
