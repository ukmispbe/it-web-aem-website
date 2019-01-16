package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.components.content.PageMetaDataExtractor;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Component(value = "Tag Cloud", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class TagCloud extends AbstractComponent implements ComponentExporter {

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter the Title",
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Tag Picker",
        fieldDescription = "Select the Tags",
        ranking = 2)
    @TagInputField
    @TagInject
    private List<Tag> tags;

    @Self
    private Resource resource;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resourceResolver;

    public List<SearchFacet> getSearchFacets(){
        final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
        final ValueMap valueMap = currentPage.getProperties();
        List<Tag> searchTags = PageMetaDataExtractor.getSearchTags(tagManager,valueMap,tags);
       return searchTags.stream()
                .map( tag -> new SearchFacet(tag.getTitle(currentPage.getLanguage(false)),tag.getParent().getName()))
                .collect(Collectors.toList());
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
