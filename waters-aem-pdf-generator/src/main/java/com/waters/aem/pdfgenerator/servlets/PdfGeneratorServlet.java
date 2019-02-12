package com.waters.aem.pdfgenerator.servlets;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = WatersConstants.RESOURCE_TYPE_PAGE,
    methods = "GET",
    extensions = WatersConstants.EXTENSION_PDF
)
public final class PdfGeneratorServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(PdfGeneratorServlet.class);

    @Reference
    private PdfGenerator pdfGenerator;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response)
        throws IOException {
        final PageDecorator page = request.getResource().getParent().adaptTo(PageDecorator.class);

        if (page == null || !WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(page.getTemplatePath())) {
            LOG.debug("page not found or invalid template type, sending 404 response");

            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        } else {
            // final boolean force = Boolean.valueOf(request.getParameter("force"));
            final boolean force = true;

            LOG.info("generating PDF for page : {}, force : {}", page.getPath(), force);

            // PDF will be generated only if it doesn't exist (or force=true)
            final String pdfAssetPath = pdfGenerator.generatePdfDocumentFromHtml(page, force).getPath();

            LOG.info("redirecting to DAM asset : {}", pdfAssetPath);

            // send redirect to DAM asset path
            response.sendRedirect(pdfAssetPath);

            // prevent caching of generated PDF in author mode
            // response.setHeader(HttpHeaders.CACHE_CONTROL, "private, no-store, no-cache, must-revalidate");
            // response.setHeader(HttpHeaders.PRAGMA, "no-cache");
        }
    }
}
