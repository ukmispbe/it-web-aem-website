package com.waters.aem.core.utils;

import com.day.cq.commons.LanguageUtil;
import com.icfolson.aem.library.api.page.PageDecorator;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class LocaleUtils {

    public static Locale getLocaleWithCountryForPage(final PageDecorator page) {
        String country = "US"; // default country if no other country is found from page path

        final String languageRoot = LanguageUtil.getLanguageRoot(page.getPath());

        if (languageRoot != null) {
            final PageDecorator languagePage = page.getPageManager().getPage(languageRoot);

            if (languagePage != null) {
                final PageDecorator countryPage = languagePage.getParent();

                // check if this is a true country node such as "us" and not a region node such as "north-america"
                if (countryPage.getName().length() == 2) {
                    country = countryPage.getName();
                }
            }
        }

        return new Locale(page.getLanguage(false).getLanguage(), country);
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

    private static String getRelativeContentPath(final String languageRootPath, final String contentPath) {
        return contentPath.substring(languageRootPath.length()).replaceFirst("/", "");
    }

    private LocaleUtils() {
        
    }
}
