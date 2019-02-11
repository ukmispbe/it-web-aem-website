package com.waters.aem.pdfgenerator.services.impl;

import com.day.cq.commons.Externalizer;
import com.day.cq.tagging.Tag;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;
import com.waters.aem.core.components.content.Image;
import com.waters.aem.core.components.content.LayoutContainer;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.components.content.Title;
import com.waters.aem.core.components.content.applicationnotes.SectionContainer;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.pdfgenerator.provider.PdfContentProvider;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import com.waters.aem.pdfgenerator.services.PdfGeneratorConfiguration;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
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
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.List;

import static com.google.common.base.Preconditions.checkState;

@Component(service = PdfGenerator.class)
@Designate(ocd = PdfGeneratorConfiguration.class)
public final class DefaultPdfGenerator implements PdfGenerator {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPdfGenerator.class);

    private static final List<String> CONTENT_RESOURCE_TYPES = ImmutableList.of(
        Text.RESOURCE_TYPE,
        Title.RESOURCE_TYPE,
        Image.RESOURCE_TYPE,
        SectionContainer.RESOURCE_TYPE,
        LayoutContainer.RESOURCE_TYPE
    );

    private static final String DAM_ROOT_PATH = "/content/dam/waters/app-notes/";

    @Reference
    private ModelFactory modelFactory;

    @Reference
    private Externalizer externalizer;

    private volatile String baseUri;

    @Override
    public String getDamAssetPath(final PageDecorator page) {
        final ApplicationNotes applicationNotes = page.getContentResource().adaptTo(ApplicationNotes.class);

        final List<Tag> yearTags = applicationNotes.getYearPublished();

        checkState(!yearTags.isEmpty(), "Application Note does not have a Year tag, unable to generate PDF.");

        return new StringBuilder(DAM_ROOT_PATH)
            .append(yearTags.get(0).getName())
            .append("/")
            .append(applicationNotes.getLiteratureCode())
            .toString();
    }

    @Override
    public void convertPdfDocumentFromHtml(final SlingHttpServletRequest request, final OutputStream outputStream)
        throws IOException {
        final ResourceResolver resourceResolver = request.getResourceResolver();
        final PageDecorator page = resourceResolver.adaptTo(PageManagerDecorator.class).getContainingPage(
            request.getResource());

        final String href = page.getLinkBuilder()
            .addSelector("print")
            .build()
            .getHref();

        final InputStream stream = new URL(externalizer.externalLink(resourceResolver, Externalizer.PUBLISH, href))
            .openStream();

        HtmlConverter.convertToPdf(stream, outputStream, new ConverterProperties()
            .setBaseUri(baseUri)
            .setMediaDeviceDescription(new MediaDeviceDescription(MediaType.PRINT)));
    }

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
        LOG.debug("visiting resource : {}", resource);

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
