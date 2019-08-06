package com.waters.aem.solr.index.builder;

import com.day.cq.commons.Externalizer;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.enums.TitleType;
import com.waters.aem.core.commerce.models.Classification;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.components.structure.page.Thumbnail;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.utils.SearchUtils;
import org.apache.commons.lang3.StringUtils;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
        document.setField("title", page.getTitle(TitleType.PAGE_TITLE).or(page.getTitle()));

        setDocumentStringField(document, "description", page.getDescription());

        document.setField("isocode", locale.toString());
        document.setField("viewname", "aem");

        final String thumbnailImage = page.getContentResource().adaptTo(Thumbnail.class).getThumbnailImageRendition();

        if (thumbnailImage != null) {
            document.setField("thumbnail", externalizer.externalLink(resourceResolver, Externalizer.PUBLISH,
            thumbnailImage));
        }

        setDocumentStringField(document, "content", getPageContent());

        for (final Tag tag : page.getTags()) {
            document.addField("tags", tag.getTitle(locale));
        }

        addContentClassification(document);

        addSkuData(document);

        LOG.debug("created solr input document : {}", document);

        return document;
    }

    /**
     * Get the content classification model for this builder.
     *
     * @return classification model or empty if not used for this builder
     */
    protected abstract Optional<ContentClassification> getContentClassification();

    /**
     * Get the sku model for this builder.
     *
     * @return sku model or empty if not used for this builder
     */
    protected abstract Optional<Sku> getSku();

    private void addContentClassification(final SolrInputDocument document) {
        final Optional<ContentClassification> classificationOptional = getContentClassification();

        if (classificationOptional.isPresent()) {
            final ContentClassification classification = classificationOptional.get();

            // add literature code
            setDocumentStringField(document, "literaturecode", classification.getLiteratureCode());

            // add facets
            addFacets(document, classification);

            // add date
            addDate(document, classification);
        }
    }

    private void addSkuData(final SolrInputDocument document) {
        final Optional<Sku> skuOptional = getSku();

        if (skuOptional.isPresent()) {
            final Sku sku = skuOptional.get();

            final DisplayableSku displayableSku = new DisplayableSku(sku, page.getContentResource(), siteContext);

            if (displayableSku.isActive()) {
                setDocumentStringField(document, "skucode", sku.getCode());

                setDocumentStringField(document, "currencycode", siteContext.getCurrencyIsoCode());

                setDocumentStringField(document, "status", sku.getSalesStatus().toString());

                final BigDecimal price = displayableSku.getPrice();

                if (price != null) {
                    document.setField("price", price.doubleValue()); // convert BigDecimal to double per Solr schema

                    document.setField("displayprice", displayableSku.getFormattedPrice());
                }

                final List<String> categories = sku.getCategories();

                if (!categories.isEmpty()) {
                    setDocumentStringField(document, SearchUtils.getSolrFacetName("contenttype"), categories.get(0));
                }

                final Tag shopTag = page.getContentResource().getResourceResolver().adaptTo(TagManager.class).
                        resolve(WatersConstants.TAG_SHOP);

                if (shopTag != null) {
                    setDocumentStringField(document, SearchUtils.getSolrFacetName("category"),
                            shopTag.getTitle(siteContext.getLocale()));
                }

                addReplacementSku(document, displayableSku);

                addFacets(document, sku);

                addDate(document, page);
            }
        }
    }

    private String getPageContent() {
        final TextResourceVisitor visitor = new TextResourceVisitor();

        visitor.accept(page.getContentResource());

        return visitor.getContent();
    }

    private void setDocumentStringField(final SolrInputDocument document, final String fieldName, final String fieldValue) {
        if (StringUtils.isNotEmpty(fieldValue)) {
            document.setField(fieldName, fieldValue);
        }
    }

    private void addReplacementSku(final SolrInputDocument document, final DisplayableSku displayableSku) {
        final String replacementSkuCode = displayableSku.getReplacementSkuCode();

        if (StringUtils.isNotEmpty(replacementSkuCode)) {
            document.setField("replacementskucode", replacementSkuCode);

            setDocumentStringField(document, "replacementskuurl", displayableSku.getReplacementSkuPageHref());
        }
    }

    private void addFacets(final SolrInputDocument document, final ContentClassification contentClassification) {
        // get the locale from the current page
        final Locale locale = page.getLanguage(false);

        // get all tags and group by their parent tag name, which maps to the facet field name
        final Map<String, List<Tag>> groupedTags = contentClassification.getAllTags()
            .stream()
            .collect(Collectors.groupingBy(tag -> tag.getParent().getName()));

        for (final Map.Entry<String, List<Tag>> entry : groupedTags.entrySet()) {
            final String fieldName = SearchUtils.getSolrFacetName(entry.getKey());

            LOG.info("adding facet with field name : {} and {} values", fieldName, entry.getValue().size());

            for (final Tag tag : entry.getValue()) {
                document.addField(fieldName, tag.getTitle(locale));
            }
        }
    }

    private void addFacets(final SolrInputDocument document, final Sku sku) {
        final List<Classification> classifications = sku.getClassifications();

        for (final Classification classification : classifications) {
            if (classification.isFacet()) {
                document.setField(SearchUtils.getSolrFacetName(classification.getTitle()), classification.getFormattedFeatureValues());
            }
        }
    }

    private void addDate(final SolrInputDocument document, final ContentClassification contentClassification) {
        if (!contentClassification.getYearPublished().isEmpty()) {
            final Tag yearPublished = contentClassification.getYearPublished().get(0);

            final int year = Integer.valueOf(yearPublished.getName());
            final int month;

            if (!contentClassification.getMonthPublished().isEmpty()) {
                final Tag monthPublished = contentClassification.getMonthPublished().get(0);

                month = Month.valueOf(monthPublished.getName().toUpperCase()).getValue();
            } else {
                // default month if not authored
                month = 1;
            }

            final Instant date = LocalDateTime.of(year, month, 1, 0, 0).toInstant(ZoneOffset.UTC);

            document.setField("datepublished", DateTimeFormatter.ISO_INSTANT.format(date));
        }
    }

    private void addDate(final SolrInputDocument document, final PageDecorator page) {
        final Date datePublished = page.getProperties().get(NameConstants.PN_PAGE_LAST_REPLICATED, Date.class);

        if (datePublished != null) {
            document.setField("datepublished", DateTimeFormatter.ISO_INSTANT.format(datePublished.toInstant()));
        }
    }

}
