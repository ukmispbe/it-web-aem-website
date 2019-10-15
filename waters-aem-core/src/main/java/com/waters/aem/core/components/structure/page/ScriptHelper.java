package com.waters.aem.core.components.structure.page;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.Video;
import com.waters.aem.core.services.brightcove.BrightcoveService;
import com.waters.aem.core.utils.BrightcoveUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;

import javax.inject.Inject;
import java.util.Collections;
import java.util.Objects;
import java.util.stream.Collectors;

@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy =
    DefaultInjectionStrategy.OPTIONAL)
public class ScriptHelper {

    @OSGiService
    private BrightcoveService brightcoveService;

    @OSGiService
    private ModelFactory modelFactory;

    @Inject
    private PageDecorator currentPage;

    @Self
    private SiteContext siteContext;

    @Self
    private SlingHttpServletRequest request;

    public boolean getPageHasVideoComponent() {
        return hasVideoComponent();
    }

    private boolean hasVideoComponent() {
        return !currentPage.getComponentNode()
        .transform(contentNode -> contentNode.findDescendants(
        new ComponentNodeResourceTypePredicate(Video.RESOURCE_TYPE))
        .stream()
        .map(componentNode -> modelFactory.getModelFromWrappedRequest(request, componentNode.getResource(),
            Video.class))
        .filter(Objects :: nonNull)
        .collect(Collectors.toList())).or(Collections.emptyList()).isEmpty();
    }

    public String getBrightcoveAccount() {
        return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
    }

    public String getBrightcovePlayerId() {
        return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
    }

}
