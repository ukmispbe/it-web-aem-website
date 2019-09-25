package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.commons.Externalizer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.enums.TitleType;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.waters.aem.core.commerce.models.Classification;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;

import com.waters.aem.core.utils.LocaleUtils;

import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
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
@Model(adaptables = Resource.class,  defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Meta extends AbstractComponent {

    static final String FILE_NAME = "meta";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final String PROPERTY_CANONICAL_URL = "canonicalUrl";

    private static final String PROPERTY_NO_INDEX = "noIndex";

    private static final String PROPERTY_NO_FOLLOW = "noFollow";

    private static final String DEFAULT_FACEBOOK_APP_ID = "";

    private static final String DEFAULT_TWITTER_PUBLISHER_HANDLE = "@WatersCorp";

    private static final String DEFAULT_TWITTER_CARD = "summary_large_image";

    private static final String DEFAULT_OG_TYPE = "none";

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

    @DialogField(fieldLabel = "Canonical URL",
        fieldDescription = "Defaults to current page path.",
        ranking = 1)
    @PathField
    public String getCanonicalUrl() {
        return getAsHref(PROPERTY_CANONICAL_URL)
            .transform(this :: externalize)
            .or(externalize(currentPage.getHref()));
    }

    @DialogField(fieldLabel = "No Index",
        fieldDescription = "Add NOINDEX metadata tag.",
        ranking = 2)
    @Switch(offText = "No", onText = "Yes")
    public Boolean isNoIndex() {
        return get(PROPERTY_NO_INDEX, false);
    }

    @DialogField(fieldLabel = "No Follow",
        fieldDescription = "Add NOFOLLOW metadata tag.",
        ranking = 3)
    @Switch(offText = "No", onText = "Yes")
    public Boolean isNoFollow() {
        return get(PROPERTY_NO_FOLLOW, false);
    }

    @DialogField(fieldLabel = "Open Graph Type",
        fieldDescription = "Select a type to include Open Graph metadata for the page.",
        ranking = 4)
    @Selection(
        type = Selection.SELECT,
        options = {
            @Option(text = "None", value = DEFAULT_OG_TYPE),
            @Option(text = "Article", value = "article"),
            @Option(text = "Book", value = "book"),
            @Option(text = "Profile", value = "profile"),
            @Option(text = "Website", value = "website"),
            @Option(text = "Movie", value = "video.movie"),
            @Option(text = "Episode", value = "video.episode"),
            @Option(text = "TV Show", value = "video.tv_show"),
            @Option(text = "Video", value = "video.other"),
            @Option(text = "Song", value = "music.song"),
            @Option(text = "Album", value = "music.album"),
            @Option(text = "Playlist", value = "music.playlist"),
            @Option(text = "Radio Station", value = "music.radio_station")
        }
    )
    public String getOgType() {
        return get("ogType", DEFAULT_OG_TYPE);
    }

    @DialogField(fieldLabel = "Open Graph Image",
        fieldDescription = "Default to page thumbnail image.",
        ranking = 5)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    public String getOgImage() {
        return getExternalizedImage("ogImage");
    }

    @DialogField(fieldLabel = "Facebook App ID", ranking = 6)
    @TextField
    public String getFacebookAppId() {
        return getInherited("facebookAppId", DEFAULT_FACEBOOK_APP_ID);
    }

    @DialogField(fieldLabel = "Twitter Publisher Handle",
        fieldDescription = "Defaults to @WatersCorp.",
        ranking = 7)
    @TextField
    public String getTwitterPublisherHandle() {
        return getInherited("twitterPublisherHandle", DEFAULT_TWITTER_PUBLISHER_HANDLE);
    }

    @DialogField(fieldLabel = "Twitter Card",
        fieldDescription = "Select the Twitter card type.",
        ranking = 8)
    @Selection(
        type = Selection.SELECT,
        options = {
            @Option(text = "Summary Large Image", value = DEFAULT_TWITTER_CARD),
            @Option(text = "Summary", value = "summary"),
            @Option(text = "App", value = "app"),
            @Option(text = "Player", value = "player")
        }
    )
    public String getTwitterCard() {
        return get("twitterCard", DEFAULT_TWITTER_CARD);
    }
    
    public String getSkuCode() {
        return Optional.ofNullable(sku).map(Sku::getCode).orElse(null);
    }

    @DialogField(fieldLabel = "Twitter Image",
        fieldDescription = "Default to page thumbnail image.",
        ranking = 9)
    @PathField(rootPath = WatersConstants.DAM_PATH)
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
        properties.put("@type", "TechArticle");
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
        properties.put("@type", "Product");
        properties.put("description", getDescription());
        properties.put("name", getTitle());
        properties.put("image", getThumbnailImage());

        if (sku != null) {
            properties.put("sku", sku.getCode());
            properties.put("brand", getBrand());
        }

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
                .map(page -> new HrefLangItem(page, externalize(page.getHref())))
                .collect(Collectors.toList());
    }

    public boolean isHomepage() {
        return Templates.isHomePage(currentPage);
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
