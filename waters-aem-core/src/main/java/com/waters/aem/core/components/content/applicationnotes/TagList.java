package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.NumberField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

@Component(value = "Tag List",
        description = "This is the Tag List component for waters site",
        tabs = { @Tab (title = "tag list settings")},
        path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class TagList extends AbstractComponent {

    private static final String TAGS_FROM_PAGE = "tags_from_page";
    private static final String FIXED_TAGS_LIST = "fixed_tag_list";

    @DialogField(fieldLabel = "Build Tag List using",
        fieldDescription = "Select the option to be used for building Tag list",
        ranking = 1)
    @Selection(
            type = Selection.SELECT,
            options = {
                    @Option(text = "Tags From Page", value = TAGS_FROM_PAGE),
                    @Option(text = "Fixed Tag List", value = FIXED_TAGS_LIST)
            }
    )
    public String getTagListType(){
        return get("tagListType", TAGS_FROM_PAGE);
    }

    @DialogField(fieldLabel = "Tag Picker",
        fieldDescription = "choose the tag root path",
        ranking = 2)
    @TagInputField
    @TagInject
    private List<Tag> tagPicker = Collections.emptyList();

    @DialogField(fieldLabel = "Max Items",
            fieldDescription = "Enter Max list items",
            ranking = 3)
    @NumberField(min = "0",step = 1)
    @Inject
    private int maxItems;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resourceResolver;

    private List<Tag> listItems = new ArrayList<>();

    public int getMaxItems() {
        return maxItems;
    }

    public List<Tag> getListItems(){

        if(CollectionUtils.isEmpty(listItems)){
            populateTagListItems(getTagListType());
        }

        return listItems;
    }

    private void populateTagListItems(String listType) {
        switch (listType) {
            case TAGS_FROM_PAGE:
                populateListItemsFromPageTags();
                break;
            case FIXED_TAGS_LIST:
                listItems = tagPicker;
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
     * @return
     */
    private void populateListItemsFromPageTags() {
        final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
        final ValueMap valueMap = currentPage.getProperties();
        for (Tag tag : tagPicker) {
            Object tagValueFromPageProperty  = valueMap.entrySet().stream()
                                                                  .filter(entry -> entry.getKey().equalsIgnoreCase(tag.getName()))
                                                                  .map(entry -> entry.getValue())
                                                                  .findFirst()
                                                                  .orElse(null);

            if(tagValueFromPageProperty != null){
                listItems.addAll(Arrays.stream((String[])tagValueFromPageProperty)
                                       .map(value -> tagManager.resolve(value))
                                       .collect(Collectors.toList())) ;
            }
        }
    }

    private void sortListItems() {
        if(!CollectionUtils.isEmpty(listItems)){
            listItems = listItems.stream()
                                 .sorted(Comparator.comparing(Tag::getTitle))
                                 .collect(Collectors.toList());
        }
    }

    private void setMaxItems() {
        if(maxItems != 0) {
            listItems = listItems.stream()
                    .limit(maxItems)
                    .collect(Collectors.toList());
        }
    }

}