package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component( value = "Tag Cloud" , path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class TagCloud extends AbstractComponent {

    @DialogField(fieldLabel = "Title",
            fieldDescription = "Enter the Title",
            ranking = 1)
    @TextField
    @Inject
    private String tagCloudTitle;

    @DialogField(fieldLabel = "Tag Picker",
        fieldDescription = "Select the Tags",
        ranking = 2)
    @PathField(rootPath = WatersConstants.TAG_PATH)
    @LinkInject
    private Link tagPicker;

    public String getTagCloudTitle() {
        return tagCloudTitle;
    }

    public Link getTagPicker() {
        return tagPicker;
    }
}
