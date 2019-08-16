package com.waters.aem.core.components.structure;

import com.icfolson.aem.library.api.page.PageDecorator;

/**
 * A wrapper class to represent any page under a particular language, where that language's title is accessible from
 * this class. ex: a page at /content/waters/us/en/shop/products would have a language title of "English".
 */
public class LanguageSelectorItem {

    private String languageTitle;

    private PageDecorator languagePage;

    public LanguageSelectorItem(final String languageTitle, final PageDecorator languagePage) {
        this.languageTitle = languageTitle;
        this.languagePage = languagePage;
    }

    public String getLanguageTitle() {
        return languageTitle;
    }

    public PageDecorator getLanguagePage() {
        return languagePage;
    }
}
