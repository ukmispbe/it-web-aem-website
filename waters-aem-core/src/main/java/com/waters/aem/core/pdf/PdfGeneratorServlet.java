package com.waters.aem.core.pdf;

import com.google.common.base.Charsets;
import com.google.common.net.MediaType;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.ServletException;
import java.io.IOException;

@SlingServlet(
    resourceTypes = WatersConstants.RESOURCE_TYPE_PAGE,
    selectors = "page",
    methods = "GET",
    extensions = "pdf"
)
public final class PdfGeneratorServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(PdfGeneratorServlet.class);

    @Reference
    private PdfGeneratorService pdfGenerator;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response)
        throws ServletException, IOException {
        LOG.info("generating PDF for page resource : {}", request.getResource().getPath());

        final PDDocument document = pdfGenerator.generatePdfDocument(request);

        response.setCharacterEncoding(Charsets.UTF_8.name());
        response.setContentType(MediaType.PDF.withoutParameters().toString());

        document.save(response.getOutputStream());
        document.close();
    }
}
