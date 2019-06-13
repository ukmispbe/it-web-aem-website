package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExternalLink extends BasicLink{

    @DialogField(fieldLabel = "External Link",
    fieldDescription = "Select this option to indicate the link is external",
    ranking = 5)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean external;

    public Boolean isExternal() {
        return external;
    }
}