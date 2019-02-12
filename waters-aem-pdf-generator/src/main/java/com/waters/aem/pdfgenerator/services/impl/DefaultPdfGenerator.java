package com.waters.aem.pdfgenerator.services.impl;

import com.day.cq.commons.Externalizer;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.wcm.api.WCMMode;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import com.waters.aem.pdfgenerator.services.PdfGeneratorConfiguration;
import org.apache.commons.codec.binary.Base64;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

@Component(service = PdfGenerator.class)
@Designate(ocd = PdfGeneratorConfiguration.class)
public final class DefaultPdfGenerator implements PdfGenerator {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPdfGenerator.class);

    @Reference
    private Externalizer externalizer;

    private volatile String baseUri;

    @Override
    public OutputStream generatePdfDocumentFromHtml(final PageDecorator page) throws IOException {
        return null;
    }

    @Override
    public Asset generatePdfDocumentFromHtml(final PageDecorator page, final boolean force)
        throws IOException {
        final ResourceResolver resourceResolver = page.getContentResource().getResourceResolver();

        // get PDF asset path derived from application notes metadata
        final String pdfAssetPath = page.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();

        // get existing PDF resource if it exists
        final Resource pdfAssetResource = resourceResolver.getResource(pdfAssetPath);

        LOG.info("page : {}, PDF asset resource : {}", page.getPath(), pdfAssetResource);

        final Asset asset;

        if (pdfAssetResource == null || force) {
            // generate and store PDF asset
            asset = createPdfAsset(resourceResolver, page, pdfAssetPath);
        } else {
            // return existing asset
            asset = pdfAssetResource.adaptTo(Asset.class);
        }

        return asset;
    }

    @Override
    public void deletePdfDocument(final PageDecorator page) throws PersistenceException {
        // get PDF asset path derived from application notes metadata
        final String pdfAssetPath = page.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();

        final ResourceResolver resourceResolver = page.getContentResource().getResourceResolver();

        // get existing PDF resource if it exists
        final Resource pdfAssetResource = resourceResolver.getResource(pdfAssetPath);

        LOG.info("deleting PDF asset resource : {}", pdfAssetResource);

        resourceResolver.delete(pdfAssetResource);
    }

    @Activate
    @Modified
    protected void activate(final PdfGeneratorConfiguration configuration) {
        baseUri = configuration.baseUri();
    }

    private Asset createPdfAsset(final ResourceResolver resourceResolver, final PageDecorator page,
        final String pdfAssetPath) throws IOException {
        final Asset asset;

        try (final ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream()) {
            // write PDF document to new output stream
            generatePdfDocumentFromHtml(page, pdfOutputStream);

            // convert output stream to input stream to store asset
            try (final InputStream assetInputStream = new ByteArrayInputStream(pdfOutputStream.toByteArray())) {
                final AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);

                asset = assetManager.createAsset(pdfAssetPath, assetInputStream,
                    com.google.common.net.MediaType.PDF.withoutParameters().toString(), true);
            }
        }

        return asset;
    }

    private void generatePdfDocumentFromHtml(final PageDecorator page, final ByteArrayOutputStream pdfOutputStream)
        throws IOException {
        final ResourceResolver resourceResolver = page.getContentResource().getResourceResolver();

        final String externalUrl = externalizer.externalLink(resourceResolver, Externalizer.AUTHOR,
            page.getLinkBuilder()
                .addSelector("print")
                .addParameter("wcmmode", WCMMode.DISABLED.name().toLowerCase())
                .build()
                .getHref());

        LOG.info("creating PDF document from page URL : {}", externalUrl);

        // request print view of page with author URL
        final URL url = new URL(externalUrl);
        final URLConnection connection = url.openConnection();

        connection.setRequestProperty("Authorization", getAuthorization(resourceResolver));

        final InputStream stream = connection.getInputStream();

        final PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfOutputStream));

        pdfDocument.getDocumentInfo().setMoreInfo("applicationNotesPagePath", page.getPath());
        // pdfDocument.getDocumentInfo().setTitle(page.getTitle(TitleType.PAGE_TITLE).or(page.getTitle()));

        HtmlConverter.convertToPdf(stream, pdfDocument, getConverterProperties());
    }

    private String getAuthorization(final ResourceResolver resourceResolver) {
        return "Basic " + Base64.encodeBase64URLSafeString("admin:admin".getBytes());
    }

    private ConverterProperties getConverterProperties() {
        return new ConverterProperties()
            .setBaseUri(baseUri)
            .setMediaDeviceDescription(new MediaDeviceDescription(MediaType.PRINT));
    }
}
