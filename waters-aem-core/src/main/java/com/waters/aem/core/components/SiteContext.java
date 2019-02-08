package com.waters.aem.core.components;

import com.google.common.annotations.Beta;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.Locale;

/**
 * Model that can be injected into component classes to provide the site context (i.e. locale/language).
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public final class SiteContext {

    @Inject
    private PageDecorator currentPage;

    public Locale getLocale() {
        return currentPage.getLanguage(false);
    }

    /**
     * Get the commerce currency ISO code.
     *
     * @return ISO code that maps to the commerce pricing value
     */
    @Beta
    public String getCurrencyIsoCode() {
        return currentPage.getInherited("currencyIsoCode", "");
    }
}
