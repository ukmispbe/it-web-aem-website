package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.IncludeDialogFields;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.NumberField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.day.cq.tagging.Tag;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component(value = "Tag List",
    description = "This is the Tag List component for waters site",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { TagList.class, ComponentExporter.class },
    resourceType = TagList.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class TagList extends AbstractComponent implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/taglist";

    protected static final String TAGS_FROM_CURRENT_PAGE = "tags_from_current_page";

    protected static final String FIXED_TAGS_LIST = "fixed_tag_list";

    @DialogField(fieldLabel = "Build Tag List using",
        fieldDescription = "Select the option to be used for building Tag list",
        ranking = 1)
    @Selection(
        type = Selection.SELECT,
        options = {
            @Option(text = "Tags From Current Page", value = TAGS_FROM_CURRENT_PAGE),
            @Option(text = "Fixed Tag List", value = FIXED_TAGS_LIST)
        }
    )
    @Inject
    @Default(values = TAGS_FROM_CURRENT_PAGE)
    private String tagListType;

    @IncludeDialogFields
    @Self
    @Required
    private PageMetadata pageMetadata;

    @Self
    private SiteContext siteContext;

    @DialogField(fieldLabel = "Max Items",
        fieldDescription = "Enter Max list items",
        ranking = 3)
    @NumberField(min = "0", step = 1)
    @Inject
    private int maxItems;

    private List<String> listItems;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    @JsonProperty
    public List<String> getListItems() {
        if (listItems == null) {
            final List<Tag> tags = getTags();

            listItems = tags.stream()
                .limit(maxItems != 0 ? maxItems : tags.size())
                .map(tag -> tag.getTitle(siteContext.getLocale()))
                .collect(Collectors.toList());
        }

        return listItems;
    }

    /**
     * Tags are assigned as part of Search Meta Data Tab ; EX-applicationNotes to pull the tags assigned to the pages as
     * part of metadata ; Tag Name must always match with the JCR property name.
     */
    private List<Tag> getTags() {
        final List<Tag> tags;

        switch (tagListType) {
            case TAGS_FROM_CURRENT_PAGE:
                tags = pageMetadata.getSearchTags();
                break;
            case FIXED_TAGS_LIST:
                tags = pageMetadata.getTags();
                break;
            default:
                tags = Collections.emptyList();
                break;
        }

        return tags;
    }
}