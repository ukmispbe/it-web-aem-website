package com.waters.aem.core.components.structure;

import com.day.cq.commons.LanguageUtil;
import com.icfolson.aem.library.api.Linkable;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.enums.TitleType;
import com.waters.aem.core.constants.WatersConstants;

/**
 * A wrapper class to represent any page of a particular country or language, where properties concerning the country
 * or language are accessible from this class.
 * ex: a page at /content/waters/us/en/shop/products would have a language title of "English".
 */
public class CountryLanguageSelectorItem {

    private PageDecorator page;

    public CountryLanguageSelectorItem(final PageDecorator page) {
        this.page = page;
    }

    public Link getHomepageLink() {
        return page.getAbsoluteParent(WatersConstants.LEVEL_SITE_ROOT).getChildren()
                .stream()
                .filter(WatersConstants.PREDICATE_HOME_PAGE::apply)
                .findFirst()
                .map(Linkable::getLink)
                .orElse(null);
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
        return page.getTitle(TitleType.PAGE_TITLE).or(page.getTitle());
    }

    public PageDecorator getPage() {
        return page;
    }
}
