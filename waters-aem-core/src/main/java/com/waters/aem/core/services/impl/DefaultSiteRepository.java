package com.waters.aem.core.services.impl;

import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.SiteRepository;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component(service = SiteRepository.class)
public final class DefaultSiteRepository implements SiteRepository {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultSiteRepository.class);

    @Override
    public List<PageDecorator> getCountryRootPages(final ResourceResolver resourceResolver) {
        final LiveRelationshipManager liveRelationshipManager = resourceResolver.adaptTo(LiveRelationshipManager.class);

        final PageDecorator rootPage = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(
            WatersConstants.ROOT_PATH);

        return rootPage.getChildren(page -> isLiveCopy(page, liveRelationshipManager));
    }

    @Override
    public PageDecorator getCountryRootPage(final ResourceResolver resourceResolver, final String countryCode) {
        return getCountryRootPages(resourceResolver)
            .stream()
            .filter(page -> countryCode.equalsIgnoreCase(page.getLanguage(false).getCountry()))
            .findFirst()
            .orElse(null);
    }

    @Override
    public List<PageDecorator> getLanguageRootPages(final ResourceResolver resourceResolver) {
        final LiveRelationshipManager liveRelationshipManager = resourceResolver.adaptTo(LiveRelationshipManager.class);

        return getCountryRootPages(resourceResolver)
            .stream()
            .map(countryRootPage -> countryRootPage.getChildren(page -> isLiveCopy(page, liveRelationshipManager)))
            .flatMap(List :: stream)
            .collect(Collectors.toList());
    }

    @Override
    public PageDecorator getLanguageRootPage(final ResourceResolver resourceResolver, final String countryCode,
        final String languageCode) {
        @SuppressWarnings({ "squid:S1854", "squid:S1481" })
        final LiveRelationshipManager liveRelationshipManager = resourceResolver.adaptTo(LiveRelationshipManager.class);

        final PageDecorator countryRootPage = getCountryRootPage(resourceResolver, countryCode);

        final Predicate<PageDecorator> predicate = Predicates.and(
            languageRootPage -> isLiveCopy(languageRootPage, liveRelationshipManager),
            languageRootPage -> languageCode.equalsIgnoreCase(languageRootPage.getLanguage(false).getLanguage())
        );

        return Optional.ofNullable(countryRootPage)
            .map(page -> page.getChildren(predicate)
                .stream()
                .findFirst()
                .orElse(null))
            .orElse(null);
    }

    private boolean isLiveCopy(final PageDecorator page, final LiveRelationshipManager liveRelationshipManager) {
        boolean liveCopy = false;

        try {
            liveCopy = liveRelationshipManager.getLiveRelationship(page.getContentResource(), false) != null;
        } catch (WCMException e) {
            LOG.error("error getting live relationship for resource : " + page.getContentResource(), e);
        }

        return liveCopy;
    }
}
