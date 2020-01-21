package com.waters.aem.core.servlets;

import com.google.common.base.Stopwatch;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.services.SiteRepository;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/qrcode")
public final class ProductQrCodeServlet extends AbstractJsonResponseServlet {

    private static final Logger LOG = LoggerFactory.getLogger(ProductQrCodeServlet.class);

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

        final Stopwatch stopwatch = Stopwatch.createStarted();

        final Sku sku = skuRepository.getSkuForGtin(request.getResourceResolver(), gtin);

        LOG.debug("traversed products for {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));

        if (sku != null) {
            // TODO use correct locale from provided query parameter instead of using hardcoded us/en
            final PageDecorator skuPage = skuRepository.getSkuPage(pageManager.getPage("/content/waters/us/en"), sku);

            if (skuPage != null) {
                response.sendRedirect(skuPage.getHref());
            } else {
                sendDefaultRedirect(response, pageManager);
            }
        } else {
            sendDefaultRedirect(response, pageManager);
        }
    }

    private void sendDefaultRedirect(final SlingHttpServletResponse response, final PageManagerDecorator pageManager)
            throws IOException {
        // TODO use correct locale from provided query parameter instead of using hardcoded us/en
        response.sendRedirect(pageManager.getPage("/content/waters/us/en/shop/shop-all-products").getHref());
    }
}
