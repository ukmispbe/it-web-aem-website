package com.waters.aem.core.pdf.impl;

import com.google.common.collect.ImmutableList;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.components.content.Title;
import com.waters.aem.core.pdf.PdfGeneratorService;
import com.waters.aem.core.pdf.PdfGeneratorServiceConfiguration;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelClassException;
import org.apache.sling.models.factory.ModelFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component(service = PdfGeneratorService.class)
@Designate(ocd = PdfGeneratorServiceConfiguration.class)
public final class DefaultPdfGeneratorService implements PdfGeneratorService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPdfGeneratorService.class);

    private static final List<String> CONTENT_RESOURCE_TYPES = ImmutableList.of(
        Text.RESOURCE_TYPE,
        Title.RESOURCE_TYPE
    );

    @Reference
    private ModelFactory modelFactory;

    private volatile String baseUri;

    @Override
    public ByteArrayOutputStream generatePdfDocument(final SlingHttpServletRequest request) throws IOException {
        final ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
        final PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfOutputStream));
        final Document document = new Document(pdfDocument);

        final ConverterProperties converterProperties = new ConverterProperties()
            .setBaseUri(baseUri)
            .setMediaDeviceDescription(new MediaDeviceDescription(MediaType.PRINT));

        visit(request, request.getResource(), document, converterProperties);

        document.close();

        return pdfOutputStream;
    }

    @Activate
    @Modified
    protected void activate(final PdfGeneratorServiceConfiguration configuration) {
        baseUri = configuration.baseUri();
    }

    /**
     * Traverse page resource hierarchy and write content to PDF stream.
     *
     * @param resource current resource
     * @param document PDF document
     * @param converterProperties converter properties
     * @throws IOException if error occurs writing to PDF stream
     */
    private void visit(final SlingHttpServletRequest request, final Resource resource,
        final Document document, final ConverterProperties converterProperties) throws IOException {
        LOG.debug("visiting resource : {}", resource);

        if (CONTENT_RESOURCE_TYPES.contains(resource.getResourceType())) {
            writePdfContentForResource(request, resource, document, converterProperties);
        } else {
            LOG.debug("ignoring content for resource type : {}", resource.getResourceType());
        }

        for (final Resource child : resource.getChildren()) {
            visit(request, child, document, converterProperties);
        }
    }

    private void writePdfContentForResource(final SlingHttpServletRequest request, final Resource resource,
        final Document document, final ConverterProperties converterProperties) throws IOException {
        try {
            // get the PDF content provider for the current resource type
            final ContentProvider contentProvider = modelFactory.getModelFromWrappedRequest(request, resource,
                ContentProvider.class);

            LOG.info("using model class : {} for resource type : {}", contentProvider.getClass().getName(),
                resource.getResourceType());

            contentProvider.writePdfContent(document, converterProperties);
        } catch (ModelClassException e) {
            LOG.error("error creating content provider model for resource type : " + resource.getResourceType(), e);
        }
    }
}
