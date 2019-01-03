package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.NumberField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(value = "Tag List",
    description = "This is the Tag List component for waters site",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class TagList extends AbstractComponent {

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

    @DialogField(fieldLabel = "Tags",
        fieldDescription = "choose the tag root path",
        ranking = 2)
    @TagInputField
    @TagInject
    private List<Tag> tags = Collections.emptyList();

    @DialogField(fieldLabel = "Max Items",
        fieldDescription = "Enter Max list items",
        ranking = 3)
    @NumberField(min = "0", step = 1)
    @Inject
    private int maxItems;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resourceResolver;

    private List<Tag> listItems = new ArrayList<>();

    public List<Tag> getListItems() {
        if (listItems.isEmpty()) {
            populateTagListItems();
        }

        return listItems;
    }

    private void populateTagListItems() {
        switch (tagListType) {
            case TAGS_FROM_CURRENT_PAGE:
                populateListItemsFromPageTags();
                break;
            case FIXED_TAGS_LIST:
                listItems = tags;
                break;
            default:
                break;
        }

        sortListItems();
        setMaxItems();
    }

    /**
     * Tags are assigned as part of Search Meta Data Tab ; EX-applicationNotes
     * to pull the tags assigned to the pages as part of metadata ; Tag Name must always
     * match with the JCR property name.
     *
     * @return
     */
    private void populateListItemsFromPageTags() {
        final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
        final ValueMap valueMap = currentPage.getProperties();

        for (Tag tag : tags) {
            final List<Tag> pageTags = valueMap.keySet()
                .stream()
                .filter(propertyName -> propertyName.equalsIgnoreCase(tag.getName()))
                .findFirst()
                .map(propertyName -> valueMap.get(propertyName, new String[0])) // get tag IDs from value map
                .map(tagIdsForProperty -> Stream.of(
                    tagIdsForProperty) // create a new stream from tag IDs and transform to tag objects
                    .map(tagManager :: resolve)
                    .filter(Objects :: nonNull)
                    .collect(Collectors.toList()))
                .orElse(Collections.emptyList()); // return empty list by default

            listItems.addAll(pageTags);
        }
    }

    private void sortListItems() {
        listItems = listItems.stream()
            .sorted(Comparator.comparing(Tag :: getTitle))
            .collect(Collectors.toList());
    }

    private void setMaxItems() {
        if (maxItems != 0) {
            listItems = listItems.stream()
                .limit(maxItems)
                .collect(Collectors.toList());
        }
    }
}