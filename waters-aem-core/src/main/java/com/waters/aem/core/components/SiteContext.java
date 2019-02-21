package com.waters.aem.core.components;

import com.day.cq.i18n.I18n;
import com.google.common.annotations.Beta;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
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

    /**
     * Get the commerce currency ISO code.
     *
     * @return ISO code that maps to the commerce pricing value
     */
    @Beta
    public String getCurrencyIsoCode() {
        return currentPage.getInherited("currencyIsoCode", "");
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
}
