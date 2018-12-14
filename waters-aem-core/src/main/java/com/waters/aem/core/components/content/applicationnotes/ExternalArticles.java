package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import java.util.List;

@Component(value = "External Articles", path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExternalArticles extends AbstractComponent {

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter external article details")
    @MultiField(composite = true)
    @InheritInject
    private List<LinkItem> linkItems;

    public List<LinkItem> getLinkItems() {
        return linkItems;
    }
}
