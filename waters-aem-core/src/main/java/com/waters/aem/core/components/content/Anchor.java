package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate;
import com.waters.aem.core.components.content.applicationnotes.SectionContainer;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component(value = "Anchor", description = "This is the Anchor component for Waters site")
@Model(adaptables = Resource.class)
public final class Anchor {

    @Inject
    private PageDecorator currentPage;

    public List<Link> getLinks() {
        // find all section container components on the current page and get the anchor link for each
        return currentPage.getComponentNode()
            .transform(contentNode -> contentNode.findDescendants(
                new ComponentNodeResourceTypePredicate(SectionContainer.RESOURCE_TYPE))
                .stream()
                .map(componentNode -> componentNode.getResource().adaptTo(SectionContainer.class).getAnchorLink())
                .filter(link -> link.getTitle() != null)
                .collect(Collectors.toList()))
            .or(Collections.emptyList());
    }
}
