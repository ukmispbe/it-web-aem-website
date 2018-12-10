package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.commons.Externalizer;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.enums.TitleType;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Component(value = "Meta",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = Meta.FILE_NAME,
    touchFileName = Meta.FILE_NAME)
@Model(adaptables = Resource.class)
public final class Meta extends AbstractComponent {

    static final String FILE_NAME = "meta";

    private static final String PROPERTY_CANONICAL_URL = "canonicalUrl";

    private static final String PROPERTY_NO_INDEX = "noIndex";

    private static final String PROPERTY_NO_FOLLOW = "noFollow";

    private static final String PROPERTY_META_DESCRIPTION = "metaDescription";

    private static final String DEFAULT_FACEBOOK_APP_ID = "";

    private static final String DEFAULT_TWITTER_PUBLISHER_HANDLE = "@WatersCorp";

    private static final String DEFAULT_TWITTER_CARD = "summary_large_image";

    @Inject
    private ResourceResolver resourceResolver;

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
        fieldDescription = "Defaults to template-specific canonical URL strategy if not provided here.",
        ranking = 1)
    @PathField
    public String getCanonicalUrl() {
        return getAsHref(PROPERTY_CANONICAL_URL)
            .transform(this :: externalize)
            .or(externalize(currentPage.getHref()));
    }

    @DialogField(fieldLabel = "Twitter Publisher Handle",
        fieldDescription = "e.g. @WatersCorp.  If this value is present Twitter metadata will be included on the page.",
        ranking = 2)
    @TextField
    public String getTwitterPublisherHandle() {
        return getInherited("twitterPublisherHandle", DEFAULT_TWITTER_PUBLISHER_HANDLE);
    }

    @DialogField(fieldLabel = "Twitter Card",
        fieldDescription = "Select the Twitter card type.",
        ranking = 3)
    @Selection(
        type = Selection.SELECT,
        options = {
            @Option(text = "Summary Large Image", value = "summary_large_image"),
            @Option(text = "Summary", value = "summary"),
            @Option(text = "App", value = "app"),
            @Option(text = "Player", value = "player")
        }
    )
    public String getTwitterCard() {
        return get("twitterCard", DEFAULT_TWITTER_CARD);
    }

    @DialogField(fieldLabel = "Twitter Image", ranking = 4)
    @PathField(rootPath = PathConstants.PATH_CONTENT_DAM)
    public String getTwitterImage() {
        return getExternalizedImage("twitterImage");
    }

    @DialogField(fieldLabel = "Open Graph Type",
        fieldDescription = "Select a type to include Open Graph metadata for the page.",
        ranking = 5)
    @Selection(
        type = Selection.SELECT,
        options = {
            @Option(text = "None", value = "none"),
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
        return get("ogType", "");
    }

    @DialogField(fieldLabel = "Open Graph Image", ranking = 6)
    @PathField(rootPath = PathConstants.PATH_CONTENT_DAM)
    public String getOgImage() {
        return getExternalizedImage("ogImage");
    }

    @DialogField(fieldLabel = "Facebook App ID", ranking = 7)
    @TextField
    public String getFacebookAppId() {
        return getInherited("facebookAppId", DEFAULT_FACEBOOK_APP_ID);
    }

    @DialogField(fieldLabel = "No Index",
        fieldDescription = "Add NOINDEX metadata tag",
        ranking = 8)
    @Switch(offText = "No", onText = "Yes")
    public Boolean isNoIndex() {
        return get(PROPERTY_NO_INDEX, false);
    }

    @DialogField(fieldLabel = "No Follow",
        fieldDescription = "Add NOFOLLOW metadata tag",
        ranking = 9)
    @Switch(offText = "No", onText = "Yes")
    public Boolean isNoFollow() {
        return get(PROPERTY_NO_FOLLOW, false);
    }

    @DialogField(fieldLabel = "Description",
        fieldDescription = "Defaults to description if not provided here.",
        ranking = 10)
    @TextField
    public String getMetaDescription() {
        return get(PROPERTY_META_DESCRIPTION, currentPage.getDescription());
    }

    public List<String> getRobotsTags() {
        final List<String> robotsTags = new ArrayList<>();

        if (isNoIndex()) {
            robotsTags.add("NOINDEX");
        }

        if (isNoFollow()) {
            robotsTags.add("NOFOLLOW");
        }

        return robotsTags;
    }

    private String getExternalizedImage(final String propertyName) {
        return currentPage.getInherited(propertyName, String.class)
            .transform(this :: externalize)
            .orNull();
    }

    private String externalize(final String path) {
        return externalizer.externalLink(resourceResolver, Externalizer.PUBLISH, path);
    }
}
