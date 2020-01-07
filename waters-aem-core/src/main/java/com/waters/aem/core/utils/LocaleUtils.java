package com.waters.aem.core.utils;

import com.day.cq.commons.LanguageUtil;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@SuppressWarnings("squid:S3776")
public final class LocaleUtils {

    /**
     * If a country is not already defined in the provided page's locale, try to read the country from the content
     * path and create a locale object from that. otherwise, a default country is returned.
     *
     * @return a locale with a country
     */
    public static Locale getLocaleWithCountryForPage(final PageDecorator page) {
        final Locale locale = page.getLanguage();

        if (StringUtils.isNotEmpty(locale.getCountry())) {
            return locale;
        }

        String country = "US"; // default country if no other country is found from page path

        final String languageRoot = LanguageUtil.getLanguageRoot(page.getPath());

        if (languageRoot != null) {
            final PageDecorator languagePage = page.getPageManager().getPage(languageRoot);
            final PageDecorator countryPage = languagePage.getParent();

            // check if this is a true country node such as "us" and not a region node such as "north-america"
            if (countryPage.getName().length() == 2) {
                country = countryPage.getName();
            }
        }

        return new Locale(locale.getLanguage(), country);
    }

    /**
     * Given a page, find the same page in other regions and languages based on the content path structure.
     *
     * For example, given a page at /content/waters/us/en/search and assuming search.html also exists in other
     * regions for other languages, this could return a list of pages like the following:
     * [/content/waters/us/en/search,
     *  /content/waters/jp/en/search,
     *  /content/waters/jp/ja/search]
     *
     * @param page used to find the same page in other regions and languages
     * @return list of pages that correspond to the provided page in other regions and languages
     */
    public static List<PageDecorator> getRegionLanguagePages(final PageDecorator page) {
        final List<PageDecorator> regionLanguagePages = new ArrayList<>();

        final String languageRootPath = LanguageUtil.getLanguageRoot(page.getPath());

        if (languageRootPath != null) {
            final PageDecorator languageRootPage = page.getPageManager().getPage(languageRootPath);

            final PageDecorator currentRegionPage = languageRootPage.getParent();

            final List<PageDecorator> regionPages = new ArrayList<>();

            regionPages.add(currentRegionPage);

            // get region siblings of current region
            regionPages.addAll(currentRegionPage.getParent().getChildren(
                    siblingRegionPage -> !currentRegionPage.getPath().equals(siblingRegionPage.getPath())));

            final String relativeContentPath = getRelativeContentPath(languageRootPath, page.getPath());

            regionLanguagePages.add(page);

            for (PageDecorator regionPage : regionPages) {
                final List<PageDecorator> languagePages = regionPage.getChildren();

                for (PageDecorator languagePage : languagePages) {
                    // ensure this is a proper region/language root
                    if (LanguageUtil.getLanguageRoot(languagePage.getPath()) != null) {
                        final PageDecorator childPage = languagePage.getChild(relativeContentPath).orNull();

                        if (childPage != null && !childPage.getPath().startsWith(languageRootPath)) {
                            regionLanguagePages.add(childPage);
                        }
                    }
                }

            }
        }

        return regionLanguagePages;
    }

    /**
     * Given a page, find the same page in other languages for the current region based on the content path structure.
     *
     * This is different than {@link #getRegionLanguagePages} in that it only looks at the region of the provided page.
     *
     * For example, given a page at /content/waters/us/en/search and assuming search.html also exists in other
     * languages for the current region, this could return a list of pages like the following:
     * [/content/waters/us/en/search,
     *  /content/waters/us/es/search,
     *  /content/waters/us/de/search]
     *
     * @param page used to find the same page in other languages
     * @return list of pages that correspond to the provided page in other languages
     */
    public static List<PageDecorator> getLanguagePages(final PageDecorator page) {
        final List<PageDecorator> languagePages = new ArrayList<>();

        final String languageRootPath = LanguageUtil.getLanguageRoot(page.getPath());

        if (languageRootPath != null) {
            final PageDecorator languageRootPage = page.getPageManager().getPage(languageRootPath);

            languagePages.add(page);

            // get siblings of current language home page
            final List<PageDecorator> siblingHomepages = languageRootPage.getParent().getChildren(
                    languageHomepage -> !languageRootPath.equals(languageHomepage.getPath()));

            final String relativeContentPath = getRelativeContentPath(languageRootPath, page.getPath());

            for (PageDecorator languagePage : siblingHomepages) {
                final PageDecorator childPage = languagePage.getChild(relativeContentPath).orNull();

                if (childPage != null) {
                    languagePages.add(childPage);
                }
            }
        }

        return languagePages;
    }

    /**
     * Determines if a page exists under the defined path for global region pages.
     *
     * @param page the page to test
     * @return true if the provided page is within the global region page path
     */
    public static boolean isGlobalRegionPage(final PageDecorator page) {
        return page.getPath().startsWith(WatersConstants.ROOT_PATH_GLOBAL_EXPERIENCE);
    }

    /**
     * Gets the content path relative to the language root.
     *
     * For example, given a page path at /content/waters/us/en/library/app-notes, the language node is
     * /content/waters/us/en, therefore the returned relative path would be "library/app-notes".
     *
     * @param languageRootPath language root path
     * @param contentPath the absolute content path used to find the relative content path
     * @return the content path relative to the language root
     */
    public static String getRelativeContentPath(final String languageRootPath, final String contentPath) {
        return contentPath.substring(languageRootPath.length()).replaceFirst("/", "");
    }

    private LocaleUtils() {
        
    }
}
