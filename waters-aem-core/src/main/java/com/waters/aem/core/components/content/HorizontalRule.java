package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Component(value = "Horizontal Rule")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class HorizontalRule {

}
