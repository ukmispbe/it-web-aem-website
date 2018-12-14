package com.waters.aem.core.pdf.impl;

import com.google.common.collect.ImmutableList;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.components.content.Title;
import com.waters.aem.core.pdf.PdfGeneratorService;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelClassException;
import org.apache.sling.models.factory.ModelFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

@Component(service = PdfGeneratorService.class)
public final class DefaultPdfGeneratorService implements PdfGeneratorService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPdfGeneratorService.class);

    private static final List<String> CONTENT_RESOURCE_TYPES = ImmutableList.of(
        Text.RESOURCE_TYPE,
        Title.RESOURCE_TYPE
    );

    @Reference
    private ModelFactory modelFactory;

    @Override
    public PDDocument generatePdfDocument(final SlingHttpServletRequest request) throws IOException {
        final PDDocument document = new PDDocument();
        final PDPage page = new PDPage();

        document.addPage(page);

        try (final PDPageContentStream contentStream = new PDPageContentStream(document,
            page, PDPageContentStream.AppendMode.OVERWRITE, false)) {
            contentStream.beginText();
            resetFont(contentStream);

            visit(request, request.getResource(), contentStream);

            contentStream.endText();
        } catch (IOException e) {
            LOG.error("error streaming page content to PDF", e);

            throw e;
        }

        return document;
    }

    /**
     * Traverse page resource hierarchy and write content to PDF stream.
     *
     * @param resource current resource
     * @param contentStream PDF stream
     * @throws IOException if error occurs writing to PDF stream
     */
    private void visit(final SlingHttpServletRequest request, final Resource resource,
        final PDPageContentStream contentStream) throws IOException {
        LOG.debug("visiting resource : {}", resource);

        if (CONTENT_RESOURCE_TYPES.contains(resource.getResourceType())) {
            writePdfContentForResource(request, resource, contentStream);
        } else {
            LOG.debug("ignoring content for resource type : {}", resource.getResourceType());
        }

        for (final Resource child : resource.getChildren()) {
            visit(request, child, contentStream);
        }
    }

    private void writePdfContentForResource(final SlingHttpServletRequest request, final Resource resource,
        final PDPageContentStream contentStream) throws IOException {
        try {
            // get the PDF content provider for the current resource type
            final ContentProvider contentProvider = modelFactory.getModelFromWrappedRequest(request, resource,
                ContentProvider.class);

            LOG.info("using model class : {} for resource type : {}", contentProvider.getClass().getName(),
                resource.getResourceType());

            contentProvider.writePdfContent(contentStream);

            // reset font after each write operation
            resetFont(contentStream);
        } catch (ModelClassException e) {
            LOG.error("error creating content provider model for resource type : " + resource.getResourceType(), e);
        }
    }

    private void resetFont(PDPageContentStream contentStream) throws IOException {
        contentStream.setFont(PDType1Font.HELVETICA, 12);
    }
}
