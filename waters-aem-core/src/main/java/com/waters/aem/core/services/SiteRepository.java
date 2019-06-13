package com.waters.aem.core.services;

import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.List;

/**
 * Service for getting site root pages.
 */
public interface SiteRepository {

    /**
     * Get a list of language copy pages for a given page.
     *
     * @param blueprintPage blueprint page (language master) in any language
     * @return list of language copies (blueprint pages) for all languages
     */
    List<PageDecorator> getLanguageCopyPages(PageDecorator blueprintPage);

    /**
     * Get a list of live copy pages for a given blueprint page in a single language.
     *
     * @param blueprintPage blueprint page (language master)
     * @return list of live copy pages for the given blueprint
     */
    List<PageDecorator> getLiveCopyPages(PageDecorator blueprintPage);

    /**
     * Get all country root pages (e.g. /content/waters/us).
     *
     * @param resourceResolver resource resolver
     * @return list of country root pages
     */
    List<PageDecorator> getCountryRootPages(ResourceResolver resourceResolver);

    /**
     * Get the country root page for the given language code.
     *
     * @param resourceResolver resource resolver
     * @param countryCode ISO country code (e.g. "us")
     * @return country root page or null if it does not exist
     */
    PageDecorator getCountryRootPage(ResourceResolver resourceResolver, String countryCode);

    /**
     * Get all language root pages (e.g. /content/waters/us/en).
     *
     * @param resourceResolver resource resolver
     * @return list of language root pages
     */
    List<PageDecorator> getLanguageRootPages(ResourceResolver resourceResolver);

    /**
     * Get the language root page for the given country and language codes.
     *
     * @param resourceResolver resource resolver
     * @param countryCode ISO country code (e.g. "us")
     * @param languageCode ISO language code (e.g. "en")
     * @return language root page or null if it does not exist
     */
    PageDecorator getLanguageRootPage(ResourceResolver resourceResolver, String countryCode, String languageCode);
}
