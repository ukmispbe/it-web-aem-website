package com.waters.aem.core.components.structure.page;

import com.day.cq.commons.LanguageUtil;
import com.icfolson.aem.library.api.page.PageDecorator;

import java.util.Locale;

/**
 * A wrapper class to represent any page under a particular language, where that language's title is accessible from
 * this class. ex: a page at /content/waters/us/en/shop/products would have a language title of "English".
 */
public class LanguagePageItem {

    private PageDecorator languagePage;

    private Locale locale;

    public LanguagePageItem(final PageDecorator languagePage, final Locale locale) {
        this.languagePage = languagePage;
        this.locale = locale;
    }

    public String getLanguageTitle() {
        String languageTitle = "";

        final String languageRoot = LanguageUtil.getLanguageRoot(languagePage.getPath());

        if (languageRoot != null) {
            languageTitle = languagePage.getPageManager().getPage(languageRoot).getTitle();
        }

        return languageTitle;
    }

    public PageDecorator getLanguagePage() {
        return languagePage;
    }

    public Locale getLocale() {
        return locale;
    }
}
