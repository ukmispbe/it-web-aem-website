package com.waters.aem.core.components.content;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.services.SiteRepository;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

import static com.waters.aem.core.constants.WatersConstants.PREDICATE_GLOBAL_EXP_PAGE;

/**
 * A reusable model to provide a list of authored country root pages.
 */
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CountryList {

    @OSGiService
    private SiteRepository siteRepository;

    @Inject
    private ResourceResolver resourceResolver;

    public List<PageDecorator> getCountryRootPages() {
        return siteRepository.getCountryRootPages(resourceResolver)
                .stream()
                .filter(page -> !isGlobalExperiencePage(page))
                .collect(Collectors.toList());
    }

    private boolean isGlobalExperiencePage(final PageDecorator page) {
        return PREDICATE_GLOBAL_EXP_PAGE.apply(page);
    }
}
