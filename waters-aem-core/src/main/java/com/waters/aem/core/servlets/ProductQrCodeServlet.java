package com.waters.aem.core.servlets;

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
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Locale;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/qrcode")
public final class ProductQrCodeServlet extends AbstractJsonResponseServlet {

    private static final Logger LOG = LoggerFactory.getLogger(ProductQrCodeServlet.class);

    private static final String DEFAULT_LANGUAGE_ROOT_PATH = "/content/waters/us/en";

    private static final String GLOBAL_EXP_ROOT_PATH = "/content/waters/xg/en";

    private static final String SHOP_ALL_PRODUCTS_REL_PATH = "/shop/shop-all-products";

    @Reference
    private SkuRepository skuRepository;

    @Reference
    private SiteRepository siteRepository;

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
            throws IOException {
        final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);

        final String gtin = Optional.ofNullable(request.getParameter("gtin")).orElse("");
        final String locale = Optional.ofNullable(request.getParameter("locale")).orElse("");

        final ResourceResolver resourceResolver = request.getResourceResolver();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        final Sku sku = skuRepository.getSkuForGtin(request.getResourceResolver(), gtin);

        LOG.debug("traversed products for {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));

        final String languageRootPath = getRootLanguagePath(resourceResolver, locale);

        if (sku != null && languageRootPath != null) {
            final PageDecorator skuPage = skuRepository.getSkuPage(pageManager.getPage(languageRootPath), sku);

            if (skuPage != null) {
                response.sendRedirect(skuPage.getHref());
            } else {
                sendDefaultRedirect(response, pageManager, languageRootPath);
            }
        } else {
            sendDefaultRedirect(response, pageManager, DEFAULT_LANGUAGE_ROOT_PATH);
        }
    }

    private String getRootLanguagePath(final ResourceResolver resourceResolver, final String locale) {
        final Locale locleObj = LocaleUtils.toLocale(locale);

        final PageDecorator countryRoot =  siteRepository.getCountryRootPage(resourceResolver, locleObj.getCountry());

        final PageDecorator languageRoot =  siteRepository.getLanguageRootPage(resourceResolver, locleObj.getCountry(),
            locleObj.getLanguage());

        final String languageRootPath;

        if(countryRoot == null) {
            languageRootPath = GLOBAL_EXP_ROOT_PATH;
        } else {
            languageRootPath = languageRoot != null ? languageRoot.getPath() : countryRoot.getChildren().get(0).getPath();
        }
        LOG.debug("returning the Language root path: {} for locale param {}", languageRootPath, locale);
        return languageRootPath;
    }

    private void sendDefaultRedirect(final SlingHttpServletResponse response, final PageManagerDecorator pageManager,
        final String languageRootPath) throws IOException {
        response.sendRedirect(pageManager.getPage(languageRootPath + SHOP_ALL_PRODUCTS_REL_PATH).getHref());
    }
}
