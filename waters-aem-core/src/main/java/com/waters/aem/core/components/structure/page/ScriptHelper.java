package com.waters.aem.core.components.structure.page;

import com.adobe.cq.xf.ExperienceFragmentsConstants;
import com.icfolson.aem.library.api.node.ComponentNode;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.Video;
import com.waters.aem.core.services.brightcove.BrightcoveService;
import com.waters.aem.core.utils.BrightcoveUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.Collections;
import java.util.Objects;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ScriptHelper {

    @OSGiService
    private BrightcoveService brightcoveService;

    @Inject
    private PageDecorator currentPage;

    @Self
    private SiteContext siteContext;

    public boolean getPageHasVideoComponent() {
        return hasVideoComponent(currentPage) || experienceFragmentHasVideoComponent();
    }

    public String getBrightcoveAccount() {
        return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
    }

    public String getBrightcovePlayerId() {
        return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
    }

    private boolean hasVideoComponent(final PageDecorator pageDecorator) {
        return !pageDecorator.getComponentNode().transform(contentNode -> contentNode.findDescendants(
            new ComponentNodeResourceTypePredicate(Video.RESOURCE_TYPE))
            .stream()
            .filter(Objects :: nonNull)
            .collect(Collectors.toList())).or(Collections.emptyList()).isEmpty();
    }

    private boolean experienceFragmentHasVideoComponent() {
        return !currentPage.getComponentNode()
            .transform(contentNode -> contentNode.findDescendants(
            new ComponentNodeResourceTypePredicate(ExperienceFragmentsConstants.RT_EXPERIENCE_FRAGMENT_COMPONENT))
            .stream()
            .map(ComponentNode::getResource)
            .filter(this::videoComponentExistsInFragment)
            .filter(Objects :: nonNull)
            .collect(Collectors.toList())).or(Collections.emptyList()).isEmpty();
    }

    private boolean videoComponentExistsInFragment(Resource resource) {
        ValueMap map = resource.getValueMap();

        PageDecorator pageDecorator = resource.getResourceResolver()
            .getResource(map.get(ExperienceFragmentsConstants.PN_FRAGMENT_PATH, "")).adaptTo(PageDecorator.class);

        return pageDecorator != null && hasVideoComponent(pageDecorator);
    }
}