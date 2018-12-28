package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.components.structure.page.Thumbnail;
import com.waters.aem.core.constants.WatersConstants;
import jdk.nashorn.internal.ir.annotations.Reference;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;

@Component(value = "Tag List", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class TagList extends AbstractComponent {

    @DialogField(fieldLabel = "Tag Picker",
        fieldDescription = "Select the Tags",
        ranking = 1)
    @TagInputField
    @TagInject
    private List<Tag> tagPicker;

    @Inject
    private PageDecorator currentPage;

    @Reference
    JcrTagManagerFactory jcrTagManagerFactory;

    @Self
    private Resource resource;


    public List<Tag> getTagPicker() {
       /* final TagManager tagManager = resource.adaptTo(TagManager.class);
        resource.adaptTo(TagManager.class).fin

        Tag[] tags = currentPage.getTags();
        for (Tag tag : tags) {
            tag.getPath()
        }*/
       return Arrays.asList(currentPage.getTags());

    }
}
