package com.waters.aem.core.components.structure.page;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.utils.LocaleUtils;

/**
 * A wrapper class to represent a single hreflang meta tag.
 */
public class HrefLangItem {

    private PageDecorator page;
    private String href;

    public HrefLangItem(final PageDecorator page, final String href) {
        this.page = page;
        this.href = href;
    }

    public String getHref() {
        return href;
    }

    public String getLanguageTag() {
        return LocaleUtils.isGlobalRegionPage(page) ?
                page.getLanguage(false).toLanguageTag() :
                LocaleUtils.getLocaleWithCountryForPage(page).toLanguageTag();
    }
}
