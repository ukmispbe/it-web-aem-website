package com.waters.aem.pdfgenerator.servlets;

import com.day.cq.commons.Externalizer;
import com.google.common.base.Charsets;
import com.google.common.net.MediaType;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.apache.sling.settings.SlingSettingsService;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Servlet for previewing Application Note PDFs in author environment.
 */
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

    @Reference
    private SlingSettingsService settingsService;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws IOException {
        final PageDecorator page = request.getResource().getParent().adaptTo(PageDecorator.class);

        if (page == null || !WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(page.getTemplatePath())) {
            LOG.debug("page not found or invalid template type, sending 404 response");

            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        } else {
            LOG.debug("generating PDF for page : {}", page.getPath());

            final boolean publish = settingsService.getRunModes().contains(Externalizer.PUBLISH);

            final ByteArrayOutputStream pdfOutputStream = pdfGenerator.generatePdfDocumentFromHtml(page, publish);

            response.setCharacterEncoding(Charsets.UTF_8.name());
            response.setContentType(MediaType.PDF.withoutParameters().toString());
            response.setContentLength(pdfOutputStream.size());

            pdfOutputStream.writeTo(response.getOutputStream());
            pdfOutputStream.close();
        }
    }
}
