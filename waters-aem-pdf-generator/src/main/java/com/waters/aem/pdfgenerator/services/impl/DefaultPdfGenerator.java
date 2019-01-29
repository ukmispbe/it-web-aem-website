package com.waters.aem.pdfgenerator.services.impl;

import com.google.common.collect.ImmutableList;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.components.content.Title;
import com.waters.aem.core.components.content.applicationnotes.SectionContainer;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.pdfgenerator.provider.PdfContentProvider;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import com.waters.aem.pdfgenerator.services.PdfGeneratorConfiguration;
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
import java.net.URL;
import java.util.List;

@Component(service = PdfGenerator.class)
@Designate(ocd = PdfGeneratorConfiguration.class)
public final class DefaultPdfGenerator implements PdfGenerator {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPdfGenerator.class);

    private static final List<String> CONTENT_RESOURCE_TYPES = ImmutableList.of(
        Text.RESOURCE_TYPE,
        Title.RESOURCE_TYPE,
        com.waters.aem.core.components.content.Image.RESOURCE_TYPE,
        SectionContainer.RESOURCE_TYPE
    );

    @Reference
    private ModelFactory modelFactory;

    private volatile String baseUri;

    @Override
    public ByteArrayOutputStream generatePdfDocument(final SlingHttpServletRequest request) throws IOException {
        final ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
        final PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfOutputStream));
        final Document document = new Document(pdfDocument);

        addHeader(document);

        final Resource rootResource = request.getResource().getChild(WatersConstants.RESOURCE_NAME_ROOT);

        // iterate over children of root resource (layout container) to build PDF content
        for (final Resource child : rootResource.getChildren()) {
            updatePdfDocument(request, child, document);
        }

        addFooter(document);

        document.close();

        return pdfOutputStream;
    }

    @Override
    public void updatePdfDocument(final SlingHttpServletRequest request, final Resource resource,
        final Document document) throws IOException {
        LOG.info("visiting resource : {}", resource);

        final ConverterProperties converterProperties = new ConverterProperties()
            .setBaseUri(baseUri)
            .setMediaDeviceDescription(new MediaDeviceDescription(MediaType.PRINT));

        if (CONTENT_RESOURCE_TYPES.contains(resource.getResourceType())) {
            writePdfContentForResource(request, resource, document, converterProperties);
        } else {
            LOG.debug("ignoring content for resource type : {}", resource.getResourceType());
        }
    }

    @Activate
    @Modified
    protected void activate(final PdfGeneratorConfiguration configuration) {
        baseUri = configuration.baseUri();
    }

    private void addHeader(final Document document) {
        final URL logoImageURL = this.getClass().getResource("/waters-logo-black.png");
        final ImageData logoImageData = ImageDataFactory.create(logoImageURL);
        final com.itextpdf.layout.element.Image logoImage = new com.itextpdf.layout.element.Image(logoImageData);

        logoImage.setWidth(115);

        document.add(logoImage);
    }

    private void addFooter(final Document document) {

    }

    private void writePdfContentForResource(final SlingHttpServletRequest request, final Resource resource,
        final Document document, final ConverterProperties converterProperties) throws IOException {
        try {
            // get the PDF content provider for the current resource type
            final PdfContentProvider contentProvider = modelFactory.getModelFromWrappedRequest(request, resource,
                PdfContentProvider.class);

            LOG.info("using model class : {} for resource type : {}", contentProvider.getClass().getName(),
                resource.getResourceType());

            contentProvider.writePdfContent(request, document, converterProperties);
        } catch (ModelClassException e) {
            LOG.error("error creating content provider model for resource type : " + resource.getResourceType(), e);
        }
    }
}
