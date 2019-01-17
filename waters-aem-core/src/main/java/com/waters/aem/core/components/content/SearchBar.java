package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.icfolson.aem.library.core.components.AbstractComponent;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Component(value = "Search Bar",
        description = "This is the Search Bar component for Waters site")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchBar extends AbstractComponent {

}
