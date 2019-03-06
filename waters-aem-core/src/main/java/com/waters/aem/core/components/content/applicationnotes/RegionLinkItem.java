package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogFieldOverride;
import com.citytechinc.cq.component.annotations.Property;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class RegionLinkItem extends LinkItem {

    @DialogFieldOverride(ranking = 1, required = false, hideLabel = true, additionalProperties = {
        @Property(name = "cq:hideOnEdit", value = "true")
    })
    @Override
    public String getText() {
        return super.getText();
    }
}
