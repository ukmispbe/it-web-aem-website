package com.waters.aem.pdfgenerator.services.impl;

import com.day.cq.commons.Externalizer;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.wcm.api.WCMMode;
import com.icfolson.aem.library.api.link.builders.LinkBuilder;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.licensekey.LicenseKey;
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
import java.net.URL;
import java.net.URLConnection;

import static com.google.common.base.Preconditions.checkState;

import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.layout.font.FontProvider;
import org.apache.commons.io.IOUtils;

@Component(service = PdfGenerator.class)
@Designate(ocd = PdfGeneratorConfiguration.class)
public final class DefaultPdfGenerator implements PdfGenerator {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPdfGenerator.class);

    @Reference
    private Externalizer externalizer;

    private volatile boolean enabled;

    private volatile String baseUri;

    private volatile String username;

    private volatile String password;

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public ByteArrayOutputStream generatePdfDocumentFromHtml(final PageDecorator page, final boolean publish)
        throws IOException {
        return createPdfOutputStream(page, publish);
    }

    @Override
    public Asset generatePdfDocumentAssetFromHtml(final PageDecorator page) throws IOException {
        final Asset asset;

        try (final ByteArrayOutputStream pdfOutputStream = createPdfOutputStream(page, true)) {
            // convert output stream to input stream to store asset
            try (final InputStream assetInputStream = new ByteArrayInputStream(pdfOutputStream.toByteArray())) {
                final AssetManager assetManager = page.getContentResource().getResourceResolver()
                    .adaptTo(AssetManager.class);

                // get PDF asset path derived from application notes metadata
                final String pdfAssetPath = page.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();

                checkState(pdfAssetPath != null, "PDF asset path is null for page : " + page.getPath());

                // create/update asset
                asset = assetManager.createAsset(pdfAssetPath, assetInputStream,
                    com.google.common.net.MediaType.PDF.withoutParameters().toString(), true);
            }
        }

        return asset;
    }

    @Override
    public void deletePdfDocument(final PageDecorator page) throws PersistenceException {
        // get PDF asset path derived from application notes metadata
        final String pdfAssetPath = page.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();

        checkState(pdfAssetPath != null, "PDF asset path is null for page : " + page.getPath());

        final ResourceResolver resourceResolver = page.getContentResource().getResourceResolver();

        // get existing PDF resource if it exists
        final Resource pdfAssetResource = resourceResolver.getResource(pdfAssetPath);

        LOG.debug("deleting PDF asset resource : {}", pdfAssetResource);

        resourceResolver.delete(pdfAssetResource);
        resourceResolver.commit();
    }

    @Activate
    @Modified
    protected void activate(final PdfGeneratorConfiguration configuration) {
        enabled = configuration.enabled();
        baseUri = configuration.baseUri();
        username = configuration.username();
        password = configuration.password();

        // load itext license
        final InputStream licenseFileInputStream = this.getClass().getResourceAsStream("/itextkey.xml");

        LicenseKey.loadLicenseFile(licenseFileInputStream);
    }

    private ByteArrayOutputStream createPdfOutputStream(final PageDecorator page, final boolean publish)
        throws IOException {
        final ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();

        // write PDF document to new output stream
        generatePdfDocumentFromHtml(page, publish, pdfOutputStream);

        return pdfOutputStream;
    }

    private void generatePdfDocumentFromHtml(final PageDecorator page, final boolean publish,
        final ByteArrayOutputStream pdfOutputStream)
        throws IOException {
        final InputStream stream = getPageInputStream(page, publish);
        ConverterProperties properties = new ConverterProperties();
        if(page.getPath().contains("/cn/zh")) {
        FontProvider fontProvider = new DefaultFontProvider(false, false, false);
        byte[] fontContents = IOUtils.toByteArray(getClass().getResourceAsStream("/NotoSansCJKsc-Regular.otf"));
        FontProgram fontProgram = FontProgramFactory.createFont(fontContents);
        fontProvider.addFont(fontProgram);
        properties.setFontProvider(fontProvider);
        }
        HtmlConverter.convertToPdf(stream, pdfOutputStream, properties
            .setBaseUri(baseUri)
            .setMediaDeviceDescription(new MediaDeviceDescription(MediaType.PRINT)));
    }

    private InputStream getPageInputStream(final PageDecorator page, final boolean publish)
        throws IOException {
        final String externalUrl = getExternalUrl(page, publish);

        LOG.debug("creating PDF document from page URL : {}", externalUrl);

        final InputStream stream;

        if (publish) {
            stream = new URL(externalUrl).openStream();
        } else {
            final URL url = new URL(externalUrl);
            final URLConnection connection = url.openConnection();

            connection.setRequestProperty("Authorization", getAuthorization());

            stream = connection.getInputStream();
        }

        return stream;
    }

    private String getAuthorization() {
        final String credentials = new StringBuilder()
            .append(username)
            .append(":")
            .append(password)
            .toString();

        return "Basic " + Base64.encodeBase64URLSafeString(credentials.getBytes());
    }

    private String getExternalUrl(final PageDecorator page, final boolean publish) {
        LinkBuilder builder = page.getLinkBuilder();//.addSelector("print");

        if (!publish) {
            builder.addParameter("wcmmode", WCMMode.DISABLED.name().toLowerCase());
        }

        return externalizer.externalLink(page.getContentResource().getResourceResolver(),
            publish ? Externalizer.PUBLISH : Externalizer.AUTHOR, builder.build().getHref());
    }
}
