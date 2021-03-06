package com.waters.aem.core.components.structure;

import com.day.cq.commons.LanguageUtil;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.enums.TitleType;
import com.waters.aem.core.utils.LinkUtils;
import com.waters.aem.core.utils.LocaleUtils;

import java.util.Optional;

/**
 * A wrapper class to represent any page of a particular country or language, where properties concerning the country
 * or language are accessible from this class.
 * ex: a page at /content/waters/us/en/shop/products would have a language title of "English".
 */
public class CountryLanguageSelectorItem {

    private PageDecorator page;
    private String title;

    public CountryLanguageSelectorItem(final PageDecorator page) {
        this.page = page;
    }

    public CountryLanguageSelectorItem(final PageDecorator page, final String title) {
        this.page = page;
        this.title = title;
    }

    public Link getHomepageLink() {
        return LinkUtils.getHomepageLink(page);
    }

    public  String getCountryLanguageCode(final PageDecorator page) {
        return LocaleUtils.isGlobalRegionPage(page) ? "" :
                 LocaleUtils.getLocaleWithCountryForPage(page).toString();
    }

    public String getLanguageHrefIsocode() {
        return LocaleUtils.isGlobalRegionPage(page) ? page.getHref() :
                page.getHref()+"?locale="+LocaleUtils.getLocaleWithCountryForPage(page).toString();
    }

    /**
     * For any page, returns the language as a string by examining the root language path of the page.
     *
     * @return the language as a string such as "English" or "Spanish"
     */
    public String getLanguageTitle() {
        String languageTitle = "";

        final String languageRoot = LanguageUtil.getLanguageRoot(page.getPath());

        if (languageRoot != null) {
            languageTitle = page.getPageManager().getPage(languageRoot).getTitle();
        }

        return languageTitle;
    }

    public String getTitle() {
        return Optional.ofNullable(title)
                .orElse(page.getTitle(TitleType.PAGE_TITLE).or(page.getTitle()));
    }

    public PageDecorator getPage() {
        return page;
    }
}
