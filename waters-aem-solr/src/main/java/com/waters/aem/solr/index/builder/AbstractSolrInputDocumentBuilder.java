package com.waters.aem.solr.index.builder;

import com.day.cq.commons.Externalizer;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.components.structure.page.Thumbnail;
import org.apache.sling.api.resource.AbstractResourceVisitor;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.solr.common.SolrInputDocument;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.util.Locale;

/**
 * Base class for Solr input document builders.  Responsible for adding common fields to Solr documents. Concrete
 * classes will be specific to a given template type.
 */
public abstract class AbstractSolrInputDocumentBuilder implements SolrInputDocumentBuilder {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractSolrInputDocumentBuilder.class);

    static class TextResourceVisitor extends AbstractResourceVisitor {

        private final StringBuilder contentBuilder = new StringBuilder();

        @Override
        protected void visit(final Resource resource) {
            if (Text.RESOURCE_TYPE.equals(resource.getResourceType())) {
                final ValueMap properties = resource.getValueMap();

                if (properties.get(Text.PROPERTY_INDEXED, false)) {
                    final String text = properties.get(Text.PROPERTY_TEXT, "");

                    if (contentBuilder.length() > 0) {
                        contentBuilder.append("\n");
                    }

                    contentBuilder.append(Jsoup.clean(text, Whitelist.none()));
                }
            }
        }

        public String getContent() {
            return contentBuilder.toString();
        }
    }

    @Self
    protected SiteContext siteContext;

    @Self
    protected PageDecorator page;

    @Inject
    private Externalizer externalizer;

    public final SolrInputDocument build() {
        final SolrInputDocument document = new SolrInputDocument();

        final ResourceResolver resourceResolver = page.getContentResource().getResourceResolver();

        // get the locale from the current page
        final Locale locale = siteContext.getLocale();

        // add common fields for all page types
        document.setField("id", page.getPath());
        document.setField("url", externalizer.externalLink(resourceResolver, Externalizer.PUBLISH, page.getHref()));
        document.setField("title", page.getTitle());
        document.setField("description", page.getDescription());
        document.setField("isocode", locale.toString());
        document.setField("viewname", "aem");

        final Image thumbnailImage = page.getContentResource().adaptTo(Thumbnail.class).getThumbnailImage();

        if (thumbnailImage != null) {
            document.setField("thumbnail", externalizer.externalLink(resourceResolver, Externalizer.PUBLISH,
                thumbnailImage.getFileReference()));
        }

        document.setField("content", getPageContent());

        for (final Tag tag : page.getTags()) {
            document.addField("tags", tag.getTitle(locale));
        }

        addFields(document);

        LOG.info("created solr input document : {}", document);

        return document;
    }

    protected abstract void addFields(SolrInputDocument document);

    private String getPageContent() {
        final TextResourceVisitor visitor = new TextResourceVisitor();

        visitor.accept(page.getContentResource());

        return visitor.getContent();
    }
}
