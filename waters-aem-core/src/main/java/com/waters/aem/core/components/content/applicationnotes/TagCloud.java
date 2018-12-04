package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.List;

@Component(value = "Tag Cloud", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class TagCloud extends AbstractComponent {

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
    private List<Tag> tagPicker;

    public String getTitle() {
        return title;
    }

    public List<Tag> getTagPicker() {
        return tagPicker;
    }
}
