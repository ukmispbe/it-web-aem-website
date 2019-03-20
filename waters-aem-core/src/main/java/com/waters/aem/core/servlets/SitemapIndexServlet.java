package com.waters.aem.core.servlets;

import com.day.cq.commons.Externalizer;
import com.google.common.base.Charsets;
import com.google.common.net.MediaType;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.services.SiteRepository;
import org.apache.commons.lang3.time.FastDateFormat;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;

@Component(service = Servlet.class)
@SlingServletPaths("/sitemap")
public final class SitemapIndexServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(SitemapIndexServlet.class);

    private static final FastDateFormat DATE_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd");

    private static final String NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

    @Reference
    private SiteRepository siteRepository;

    @Reference
    private Externalizer externalizer;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws IOException {
        response.setContentType(MediaType.XML_UTF_8.withoutParameters().toString());
        response.setCharacterEncoding(Charsets.UTF_8.name());

        final List<PageDecorator> languageRootPages = siteRepository.getLanguageRootPages(
            request.getResourceResolver());

        LOG.info("creating sitemap index for {} language root page(s)", languageRootPages.size());

        final XMLOutputFactory outputFactory = XMLOutputFactory.newFactory();

        try {
            final XMLStreamWriter stream = outputFactory.createXMLStreamWriter(response.getWriter());

            stream.writeStartDocument("1.0");
            stream.writeStartElement("", "sitemapindex", NS);
            stream.writeNamespace("", NS);

            for (final PageDecorator page : languageRootPages) {
                write(page, stream, request.getResourceResolver());
            }

            stream.writeEndElement();
            stream.writeEndDocument();
        } catch (XMLStreamException e) {
            LOG.error("error writing sitemap XML stream", e);

            throw new IOException(e);
        }
    }

    private void write(final PageDecorator page, final XMLStreamWriter stream, final ResourceResolver resourceResolver)
        throws XMLStreamException {
        stream.writeStartElement(NS, "sitemap");

        writeElement(stream, "loc", externalizer.externalLink(resourceResolver, Externalizer.PUBLISH,
            LinkBuilderFactory.forPage(page)
                .addSelector("sitemap")
                .setExtension("xml")
                .build()
                .getHref()));

        final Calendar lastModified = page.getLastModified();

        if (lastModified != null) {
            writeElement(stream, "lastmod", DATE_FORMAT.format(lastModified));
        }

        stream.writeEndElement();
    }

    private void writeElement(final XMLStreamWriter stream, final String elementName, final String text)
        throws XMLStreamException {
        stream.writeStartElement(NS, elementName);
        stream.writeCharacters(text);
        stream.writeEndElement();
    }
}
