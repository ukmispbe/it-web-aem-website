package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.IncludeDialogFields;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Component(value = "Tag Cloud",
    description = "This is the Tag Cloud component for Waters site",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class TagCloud extends AbstractComponent implements ComponentExporter {

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

    @Self
    private Resource resource;

    public List<SearchFacet> getSearchFacets() {
        return pageMetadata.getSearchTags()
            .stream()
            .map(tag -> new SearchFacet(tag.getTitle(siteContext.getLocale()), tag.getParent().getName()))
            .collect(Collectors.toList());
    }

    public String getTagCloudFacetsAsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getSearchFacets());
    }

    public String getTitle() {
        return title;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
