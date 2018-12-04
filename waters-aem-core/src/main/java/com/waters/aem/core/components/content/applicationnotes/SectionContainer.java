package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component(value = "Section Container", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
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
        return LinkBuilderFactory.forPath("#" + getId()) // TODO confirm link strategy
            .setTitle(getTitle())
            .build();
    }
}
