package com.waters.aem.core.components;

import com.day.cq.commons.LanguageUtil;
import com.day.cq.i18n.I18n;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.structure.page.LanguagePageItem;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Model that can be injected into component classes to provide the site context (i.e. locale/language).
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SiteContext {

    @OSGiService(filter = "(component.name=org.apache.sling.i18n.impl.JcrResourceBundleProvider)")
    private ResourceBundleProvider resourceBundleProvider;

    @Inject
    private PageDecorator currentPage;

    private I18n i18n;

    public Locale getLocale() {
        return currentPage.getLanguage(false);
    }

    public PageDecorator getPage() {
        return currentPage;
    }

    /**
     * If a country is not already defined in the current page's locale, try to read the country from the content
     * path and create a locale object from that. otherwise, a configured default country is returned.
     *
     * @return a locale with a country
     */
    public Locale getLocaleWithCountry() {
        Locale locale = getLocale();

        if (StringUtils.isEmpty(locale.getCountry())) {
            locale = getLocaleWithCountryForPage(currentPage);
        }

        return locale;
    }

    public Locale getLocaleWithCountryForPage(final PageDecorator page) {
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
     * Get the commerce currency ISO code, defaulting to the ISO code for the current locale.
     *
     * @return ISO code that maps to the commerce pricing value
     */
    public String getCurrencyIsoCode() {
        final Currency defaultCurrency = Currency.getInstance(getLocaleWithCountry());

        return currentPage.getInherited("currencyIsoCode", defaultCurrency.getCurrencyCode());
    }

    public String getTranslation(final String key) {
        return getI18n().get(key);
    }

    public String getTranslation(final String key, final String comment, final Object... args) {
        return getI18n().get(key, comment, args);
    }

    private I18n getI18n() {
        if (i18n == null) {
            final Locale locale = getLocale();
            final ResourceBundle resourceBundle = resourceBundleProvider.getResourceBundle(locale);

            i18n = new I18n(resourceBundle);
        }

        return i18n;
    }

    public String getLanguageLocation() {
        final Locale locale = getLocale();

        final String languageCode = locale.getLanguage().toUpperCase();
        final String countryCode = locale.getCountry();

        final StringBuilder stringBuilder = new StringBuilder();

        if (!StringUtils.isBlank(languageCode)) {
            stringBuilder.append(languageCode);
        }

        if (!StringUtils.isBlank(languageCode) && !StringUtils.isBlank(countryCode)) {
            stringBuilder.append("/");
        }

        if (!StringUtils.isBlank(countryCode)) {
            stringBuilder.append(countryCode);
        }

        return stringBuilder.toString();
    }

    public List<LanguagePageItem> getHrefLangPages() {
//        1. Get home page
        final List<LanguagePageItem> hrefLangPages = new ArrayList<>();

        final String languageRootPath = LanguageUtil.getLanguageRoot(currentPage.getPath());

        if (languageRootPath != null) {
            final PageManagerDecorator pageManager = currentPage.getPageManager();

            final PageDecorator languageRootPage = pageManager.getPage(languageRootPath);

//           2. Get parent page (region page)

            final PageDecorator currentRegionPage = languageRootPage.getParent();// TODO assert region page

//           3. Get list of region pages (current region page + siblings)

            final List<PageDecorator> regionPages = new ArrayList<>();

            regionPages.add(currentRegionPage);

            // get siblings of current language home page
            regionPages.addAll(currentRegionPage.getParent().getChildren(page -> !currentRegionPage.getPath().equals(page.getPath())));

            // get relative content path from language root path
            final String contentPath = currentPage.getPath() //TODO move this to common method
                    .substring(languageRootPath.length())
                    .replaceFirst("/", "");

            hrefLangPages.add(new LanguagePageItem(currentPage, getLocaleWithCountryForPage(currentPage)));

//        4. For each region page, get list of child pages (language pages)
            for (PageDecorator regionPage : regionPages) {
                final List<PageDecorator> regionLanguagePages = regionPage.getChildren();

                //          4.1. For each language page, find content page and read locale, href

                for (PageDecorator regionLanguagePage : regionLanguagePages) {
                    final PageDecorator childPage = regionLanguagePage.getChild(contentPath).orNull();

                    if (childPage != null && !childPage.getPath().startsWith(languageRootPath)) {
                        hrefLangPages.add(new LanguagePageItem(childPage, getLocaleWithCountryForPage(childPage)));
                    }
                }

            }
        }

        return hrefLangPages;
    }

    public List<PageDecorator> getLanguagePages(final PageDecorator page) {
        final List<PageDecorator> languagePages = new ArrayList<>();

        final String languageRootPath = LanguageUtil.getLanguageRoot(page.getPath());

        if (languageRootPath != null) {
            final PageDecorator languageRootPage = page.getPageManager().getPage(languageRootPath);

            languagePages.add(page);

            // get siblings of current language home page
            final List<PageDecorator> siblingHomepages = languageRootPage.getParent().getChildren(
                    languageHomepage -> !languageRootPath.equals(languageHomepage.getPath())
                            && WatersConstants.PREDICATE_HOME_PAGE.apply(languageHomepage));

            // get relative content path from language root path
            final String contentPath = page.getPath()
                    .substring(languageRootPath.length())
                    .replaceFirst("/", "");

            for (PageDecorator languagePage : siblingHomepages) {
                final PageDecorator childPage = languagePage.getChild(contentPath).orNull();

                if (childPage != null) {
                    languagePages.add(childPage);
                }
            }
        }

        return languagePages;

    }
}
