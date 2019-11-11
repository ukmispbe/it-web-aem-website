package com.waters.aem.core.components.structure.page;

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
import java.util.Optional;

import static com.adobe.cq.xf.ExperienceFragmentsConstants.PN_FRAGMENT_PATH;
import static com.adobe.cq.xf.ExperienceFragmentsConstants.RT_EXPERIENCE_FRAGMENT_COMPONENT;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ScriptHelper {

    @OSGiService
    private BrightcoveService brightcoveService;

    @Inject
    private PageDecorator currentPage;

    @Self
    private SiteContext siteContext;

    public boolean getPageHasVideoComponent() {
        //check page for a video component and check for any fragment references containing a video component
        return pageHasComponent(currentPage, Video.RESOURCE_TYPE) || experienceFragmentHasComponent(currentPage,
                Video.RESOURCE_TYPE);
    }

    public String getBrightcoveAccount() {
        return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
    }

    public String getBrightcovePlayerId() {
        return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
    }

    private boolean pageHasComponent(final PageDecorator page, final String resourceType) {
        return page.getComponentNode().transform(contentNode -> !contentNode.findDescendants(
                new ComponentNodeResourceTypePredicate(resourceType)).isEmpty())
                .or(false);
    }

    private boolean experienceFragmentHasComponent(final PageDecorator page, final String resourceType) {
        return page.getComponentNode().transform(contentNode -> contentNode.findDescendants(
                new ComponentNodeResourceTypePredicate(RT_EXPERIENCE_FRAGMENT_COMPONENT))
                .stream()
                .map(ComponentNode :: getResource)
                .anyMatch(resource -> resourceTypeExistsInFragment(resource, resourceType)))
                .or(false);
    }

    private boolean resourceTypeExistsInFragment(final Resource fragmentResource, final String resourceType) {
        final ValueMap map = fragmentResource.getValueMap();

        final PageDecorator page = Optional.ofNullable(fragmentResource.getResourceResolver()
                .getResource(map.get(PN_FRAGMENT_PATH, "")))
                .map(resource -> resource.adaptTo(PageDecorator.class))
                .orElse(null);

        return page != null && pageHasComponent(page, resourceType);
    }
}