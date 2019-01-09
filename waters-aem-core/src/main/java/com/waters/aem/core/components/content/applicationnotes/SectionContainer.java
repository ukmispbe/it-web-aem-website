package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PARENT;

@Component(value = "Section Container",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES,
    isContainer = true,
    tabs = {
        @Tab(title = "Properties"),
    },
    listeners = { // refresh parent resource after edit to prevent issues with anchor component
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PARENT)
    })
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SectionContainer extends AbstractComponent {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/sectioncontainer";

    @DialogField(fieldLabel = "Title",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String title;

    public String getTitle() {
        return title;
    }

    public Link getAnchorLink() {
        // use generated ID for anchor
        return LinkBuilderFactory.forPath("#" + getId())
            .setTitle(getTitle())
            .build();
    }
}
