package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.IncludeDialogFields;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.Tag;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Tag Cloud",
    description = "This is the Tag Cloud component for Waters site",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES,
    listeners = {
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { TagCloud.class, ComponentExporter.class },
    resourceType = TagCloud.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class TagCloud implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/tagcloud";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Self
    private SiteContext siteContext;

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter the Title",
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @IncludeDialogFields
    @Self
    private PageMetadata pageMetadata;

    private List<SearchFacet> searchFacets;

    public List<SearchFacet> getSearchFacets() {
        if (searchFacets == null) {
            searchFacets = pageMetadata.getSearchTags()
                .stream()
                .map(tag -> new SearchFacet(tag.getTitle(siteContext.getLocale()), tag.getName(),
                    tag.getParent().getName()))
                .collect(Collectors.toList());
        }

        return searchFacets;
    }

    public String getTitle() {
        return title;
    }

    public String getContentType() {
        final List<Tag> contentTypeTags = Optional.ofNullable(pageMetadata.getContentClassification())
            .map(ContentClassification :: getContentType)
            .orElse(Collections.emptyList());

        return contentTypeTags.stream()
            .findFirst()
            .map(Tag :: getName)
            .orElse(null);
    }

    @JsonIgnore
    public String getTagCloudFacetsAsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getSearchFacets());
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
