package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.LanguageUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.enums.TitleType;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.LocaleUtils;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component(value = "Open Graph",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = Meta.FILE_NAME,
    touchFileName = Meta.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Meta extends AbstractComponent {

    static final String FILE_NAME = "meta";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final String PROPERTY_CANONICAL_URL = "canonicalUrl";

    private static final String PROPERTY_SEO_TITLE = "seoTitle";

    private static final String PROPERTY_META_DESCRIPTION = "metaDescription";

    private static final String PROPERTY_META_SCHEMA = "metaSchema";

    private static final String PROPERTY_NO_INDEX = "noIndex";

    private static final String PROPERTY_NO_FOLLOW = "noFollow";

    private static final String DEFAULT_FACEBOOK_APP_ID = "";

    private static final String DEFAULT_TWITTER_PUBLISHER_HANDLE = "@WatersCorp";

    private static final String DEFAULT_TWITTER_CARD = "summary_large_image";

    private static final String DEFAULT_OG_TYPE = "none";

    private static final String PROPERTY_TYPE = "@type";

    private static final String DEFAULT_HREF_LANG_PATH = WatersConstants.ROOT_PATH + "/us/en";

    @Inject
    private Sku sku;

    @Self
    private Resource resource;

    @Self
    private SiteContext siteContext;

    @Self
    private ApplicationNotes applicationNotes;

    @Self
    private Thumbnail thumbnail;

    @Inject
    private Externalizer externalizer;

    @Inject
    private PageDecorator currentPage;

    public String getTitle() {
        return currentPage.getTitle(TitleType.PAGE_TITLE).or(currentPage.getTitle());
    }

    public String getDescription() {
        return currentPage.getDescription();
    }

    public String getCanonicalUrl() {
        return getAsHref(PROPERTY_CANONICAL_URL)
            .transform(this :: externalize)
            .or(externalize(currentPage.getHref()));
    }

    public String getSeoTitle() {
        return get(PROPERTY_SEO_TITLE, "");
    }

    public String getMetaDescription() {
        return get(PROPERTY_META_DESCRIPTION, "");
    }

    public String getMetaSchema() {
        return get(PROPERTY_META_SCHEMA, "");
    }
    public Boolean isNoIndex() {
        return get(PROPERTY_NO_INDEX, false);
    }

    public Boolean isNoFollow() {
        return get(PROPERTY_NO_FOLLOW, false);
    }

    public String getOgType() {
        return get("ogType", DEFAULT_OG_TYPE);
    }

    public String getOgImage() {
        return getExternalizedImage("ogImage");
    }

    public String getFacebookAppId() {
        return getInherited("facebookAppId", DEFAULT_FACEBOOK_APP_ID);
    }

    public String getTwitterPublisherHandle() {
        return getInherited("twitterPublisherHandle", DEFAULT_TWITTER_PUBLISHER_HANDLE);
    }

    public String getTwitterCard() {
        return get("twitterCard", DEFAULT_TWITTER_CARD);
    }
    
    public String getSkuCode() {
        return Optional.ofNullable(sku).map(Sku::getCode).orElse(null);
    }

    public String getTwitterImage() {
        return getExternalizedImage("twitterImage");
    }

    public List<String> getRobotsTags() {
        final List<String> robotsTags = new ArrayList<>();

        if (isNoIndex()) {
            robotsTags.add("noindex");
        } else {
            robotsTags.add("index");
        }

        if (isNoFollow()) {
            robotsTags.add("nofollow");
        } else {
            robotsTags.add("follow");
        }

        return robotsTags;
    }

    public String getExternalizedPageUrl() {
        return externalize(currentPage.getHref());
    }

    public String getSchemaJson() throws JsonProcessingException {
        final Map<String, Object> properties = new HashMap<>();

        properties.put("@context", "http://schema.org");
        properties.put(PROPERTY_TYPE, "TechArticle");
        properties.put("author", getAuthor());
        properties.put("datePublished", applicationNotes.getFormattedPublishDate());
        properties.put("description", getDescription());
        properties.put("headline", getTitle());
        properties.put("image", getThumbnailImage());
        properties.put("publisher", "Waters Corporation");
        properties.put("url", getCanonicalUrl());

        return MAPPER.writeValueAsString(properties);
    }

    public String getProductSchemaJson() throws JsonProcessingException {
        final Map<String, Object> properties = new HashMap<>();

        properties.put("@context", "https://schema.org/");
        properties.put(PROPERTY_TYPE, "Product");
        properties.put("url", externalize(currentPage.getHref(true)));
        properties.put("description", getDescription());
        properties.put("name", getTitle());
        properties.put("image", getThumbnailImage());

        if (sku != null) {
            properties.put("sku", sku.getCode());
            properties.put("brand", getBrand());
        }

        final Map<String, Object> authorProperties = new HashMap<>();
        authorProperties.put(PROPERTY_TYPE, "Person");
        authorProperties.put("name", "");

        final Map<String, Object> reviewProperties = new HashMap<>();
        reviewProperties.put(PROPERTY_TYPE, "review");
        reviewProperties.put("reviewBody", "");
        reviewProperties.put("author", authorProperties);

        properties.put("review", reviewProperties);

        return MAPPER.writeValueAsString(properties);
    }

    private String getBrand() {
        return sku.getClassifications()
                .stream()
                .filter(classification -> classification.getCode().contains("brand"))
                .findFirst()
                .map(classification -> classification.getFeatureValues()[0])
                .orElse("");
    }

    public List<HrefLangItem> getHrefLangItems() {
        return LocaleUtils.getRegionLanguagePages(currentPage).stream()
                .filter(page -> !page.getPath().startsWith(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS))
                .map(page -> new HrefLangItem(page, externalize(page.getHref())))
                .collect(Collectors.toList());
    }

    public boolean isHomepage() {
        return Templates.isHomePage(currentPage);
    }

    public String getDefaultHreflang() {
        final String languageRootPath = LanguageUtil.getLanguageRoot(currentPage.getPath());

        final String relativeContentPath = LocaleUtils.getRelativeContentPath(languageRootPath, currentPage.getPath());

        return Optional.ofNullable(
            currentPage.getPageManager().getPage(DEFAULT_HREF_LANG_PATH + "/" + relativeContentPath))
            .map(page -> externalize(page.getHref()))
            .orElse(null);
    }

    public boolean isSkuPage() {
        return Templates.isSkuPage(currentPage);
    }

    public boolean isLibraryPage() {
        return Templates.isLibraryPage(currentPage) || Templates.isApplicationNotesPage(currentPage);
    }

    private String getThumbnailImage() {
        return Optional.ofNullable(thumbnail.getThumbnailImageRendition())
            .map(this :: externalize)
            .orElse(null);
    }

    private String getAuthor() {
        return applicationNotes.getAuthor()
            .stream()
            .map(tag -> tag.getTitle(siteContext.getLocale()))
            .collect(Collectors.joining(", "));
    }

    private String getExternalizedImage(final String propertyName) {
        return Optional.ofNullable(currentPage.getInherited(propertyName, thumbnail.getThumbnailImageRendition()))
            .map(this :: externalize)
            .orElse(null);
    }

    private String externalize(final String path) {
        return externalizer.externalLink(resource.getResourceResolver(), Externalizer.PUBLISH, path);
    }
}
