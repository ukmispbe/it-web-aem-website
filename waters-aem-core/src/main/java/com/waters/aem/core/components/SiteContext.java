package com.waters.aem.core.components;

import com.day.cq.i18n.I18n;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.Commerce;
import com.waters.aem.core.components.structure.page.CountryCommerceConfig;
import com.waters.aem.core.utils.LocaleUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
import java.util.Currency;
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


    public Locale getLocaleWithCountry() {
        return LocaleUtils.getLocaleWithCountryForPage(currentPage);
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

    /**
     * Returns a Locale object to be used for formatting a currency value. By default the Locale will be taken from the
     * current content path. However if any language/country overrides are specified in page properties, a new Locale
     * object will be constructed with those values.
     *
     * @return locale object to use for formatting a currency value for display
     */
    public Locale getCurrencyLocale() {
        Locale locale = getLocaleWithCountry();

        final String currencyLanguageCode = currentPage.getInherited("currencyLanguageCode", "");
        final String currencyCountryCode = currentPage.getInherited("currencyCountryCode", "");

        if (StringUtils.isNotEmpty(currencyLanguageCode) || StringUtils.isNotEmpty(currencyCountryCode)) {
            String language = locale.getLanguage();
            String country = locale.getCountry();

            if (StringUtils.isNotEmpty(currencyLanguageCode)) {
                language = currencyLanguageCode;
            }

            if (StringUtils.isNotEmpty(currencyCountryCode)) {
                country = currencyCountryCode.toUpperCase();
            }

            locale = new Locale(language, country);
        }

        return locale;
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

    public CountryCommerceConfig getCountryCommerceConfig() {
        final Commerce commerce = currentPage.getContentResource().adaptTo(Commerce.class);

        return commerce.getCountryCommerceConfig();
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


}
