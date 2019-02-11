package com.waters.aem.pdfgenerator.servlets;

import com.google.common.net.HttpHeaders;
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
    extensions = "pdf"
)
public final class PdfGeneratorServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(PdfGeneratorServlet.class);

    @Reference
    private PdfGenerator pdfGenerator;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response)
        throws IOException {
        final PageDecorator page = request.getResource().adaptTo(PageDecorator.class);

        if (page == null || !WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(page.getTemplatePath())) {
            LOG.info("page not found or invalid template type, sending 404 response");

            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        } else {
            LOG.info("generating PDF for page : {}", page.getPath());

            // determine DAM asset path for PDF and send redirect

            final String pdfAssetPath = pdfGenerator.getDamAssetPath(page);

            LOG.info("redirecting to DAM asset : {}", pdfAssetPath);

            response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
            response.setHeader(HttpHeaders.LOCATION, pdfAssetPath);

            /*
            response.setCharacterEncoding(Charsets.UTF_8.name());
            response.setContentType(MediaType.PDF.withoutParameters().toString());

            if (Boolean.valueOf(request.getParameter("convert"))) {
                pdfGenerator.convertPdfDocumentFromHtml(request, response.getOutputStream());
            } else {
                // final ByteArrayOutputStream pdfOutputStream = pdfGenerator.generatePdfDocument(request);
                final ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();

                response.setContentLength(pdfOutputStream.size());

                pdfOutputStream.writeTo(response.getOutputStream());
            }
            */
        }
    }
}
