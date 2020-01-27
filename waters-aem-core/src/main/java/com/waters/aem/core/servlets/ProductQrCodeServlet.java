package com.waters.aem.core.servlets;

import com.day.cq.wcm.api.Page;
import com.google.common.base.Stopwatch;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.services.SiteRepository;
import org.apache.commons.lang3.LocaleUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Locale;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/qrcode")
@Designate(ocd = ProductQrCodeServlet.Config.class)
public final class ProductQrCodeServlet extends AbstractJsonResponseServlet {

    private static final Logger LOG = LoggerFactory.getLogger(ProductQrCodeServlet.class);

    private volatile String defaultLanguageRootPath;

    private volatile String globalExperienceRootPath;

    private volatile String shopAllProductsRelativePath;

    private static final String PARAMETER_GTIN = "gtin";

    private static final String PARAMETER_LOCALE = "locale";

    private static final String DEFAULT_LOCALE = "en_US";

    @Reference
    private SkuRepository skuRepository;

    @Reference
    private SiteRepository siteRepository;

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
            throws IOException {
        final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);

        final String gtin = Optional.ofNullable(request.getParameter(PARAMETER_GTIN)).orElse("");
        final String locale = Optional.ofNullable(request.getParameter(PARAMETER_LOCALE)).orElse(DEFAULT_LOCALE);

        final ResourceResolver resourceResolver = request.getResourceResolver();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        final Sku sku = skuRepository.getSkuForGtin(request.getResourceResolver(), gtin);

        LOG.debug("traversed products for {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));

        final String languageRootPath = getRootLanguagePath(resourceResolver, locale);

        if (sku != null && languageRootPath != null) {
            final PageDecorator skuPage = skuRepository.getSkuPage(pageManager.getPage(languageRootPath), sku);

            if (skuPage != null) {
                response.sendRedirect(skuPage.getHref(true));
            } else {
                sendDefaultRedirect(response, pageManager, languageRootPath);
            }
        } else {
            sendDefaultRedirect(response, pageManager, defaultLanguageRootPath);
        }
    }

    private String getRootLanguagePath(final ResourceResolver resourceResolver, final String localeStr) {
        final Locale locale = LocaleUtils.toLocale(localeStr);

        final PageDecorator countryRoot = siteRepository.getCountryRootPage(resourceResolver, locale.getCountry(),
                true);

        final PageDecorator languageRoot = siteRepository.getLanguageRootPage(resourceResolver, locale.getCountry(),
            locale.getLanguage(), true);

        final String languageRootPath;

        if(countryRoot == null) {
            languageRootPath = globalExperienceRootPath;
        } else {
            languageRootPath = languageRoot != null ? languageRoot.getPath() :
                    countryRoot.getChildren()
                        .stream()
                        .findFirst()
                        .map(Page :: getPath)
                        .orElse(defaultLanguageRootPath);
        }

        LOG.debug("returning the language root path: {} for locale param {}", languageRootPath, localeStr);

        return languageRootPath;
    }

    private void sendDefaultRedirect(final SlingHttpServletResponse response, final PageManagerDecorator pageManager,
        final String languageRootPath) throws IOException {
        final PageDecorator shopAllProductsPage = pageManager.getPage(languageRootPath + shopAllProductsRelativePath);

        if (shopAllProductsPage != null) {
            response.sendRedirect(shopAllProductsPage.getHref(true));
        } else {
            LOG.warn("missing configured default redirect page at {}, redirecting to site root.",
                    languageRootPath + shopAllProductsRelativePath);

            response.sendRedirect("/");
        }
    }

    @Activate
    @Modified
    protected void activate(final Config configuration) {
        defaultLanguageRootPath = configuration.defaultLanguageRootPath();
        globalExperienceRootPath = configuration.globalExperienceRootPath();
        shopAllProductsRelativePath = configuration.redirectPageRelativePath();
    }

    @ObjectClassDefinition(name = "Waters QR Code Service Configuration")
    public @interface Config {

        @AttributeDefinition(name = "Default Language Root Path", description = "Sets the language path for the default " +
                "redirect if no sku page is found.")
        String defaultLanguageRootPath() default "/content/waters/us/en";

        @AttributeDefinition(name = "Global Experience Root Path", description = "The path for the global experience root" +
                ". This path is used if there is no existing country node")
        String globalExperienceRootPath() default "/content/waters/xg/en";

        @AttributeDefinition(name = "Default Redirect Page", description = "Sets the relative page path to redirect to in" +
                " the event that the sku page was not found.")
        String redirectPageRelativePath() default "/shop/shop-all-products";
    }
}
