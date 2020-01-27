package com.waters.aem.core.services.impl;

import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.SiteRepository;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RangeIterator;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component(service = SiteRepository.class)
@SuppressWarnings({ "squid:S1854" })
public final class DefaultSiteRepository implements SiteRepository {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultSiteRepository.class);

    @Override
    public List<PageDecorator> getLanguageCopyPages(final PageDecorator blueprintPage) {
        final String languageRootPath = blueprintPage.getAbsoluteParent(WatersConstants.LEVEL_LANGUAGE_ROOT)
            .getPath();
        final String relativePath = StringUtils.removeStart(blueprintPage.getPath(), languageRootPath);

        final PageManagerDecorator pageManager = blueprintPage.getPageManager();
        final PageDecorator languageMastersRootPage = pageManager.getPage(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS);

        return languageMastersRootPage.getChildren()
            .stream()
            .map(languageBlueprintPage -> pageManager.getPage(languageBlueprintPage.getPath() + relativePath))
            .filter(Objects :: nonNull)
            .filter(page -> !page.getPath().equals(blueprintPage.getPath()))
            .collect(Collectors.toList());
    }

    @Override
    public List<PageDecorator> getLiveCopyPages(final PageDecorator blueprintPage) {
        final Resource blueprintPageContentResource = blueprintPage.getContentResource();

        final LiveRelationshipManager liveRelationshipManager = blueprintPageContentResource.getResourceResolver()
            .adaptTo(LiveRelationshipManager.class);

        final List<PageDecorator> liveCopyPages = new ArrayList<>();

        try {
            final RangeIterator liveRelationships = liveRelationshipManager.getLiveRelationships(
                blueprintPageContentResource, WatersConstants.ROOT_PATH, null);

            final PageManagerDecorator pageManager = blueprintPage.getPageManager();

            while (liveRelationships.hasNext()) {
                final LiveRelationship liveRelationship = (LiveRelationship) liveRelationships.next();
                final String targetPath = liveRelationship.getTargetPath();

                final PageDecorator targetPage = pageManager.getContainingPage(targetPath);

                if (targetPage != null) {
                    liveCopyPages.add(targetPage);
                }
            }
        } catch (WCMException e) {
            LOG.error("error getting live relationships for blueprint : " + blueprintPageContentResource, e);
        }

        LOG.info("found {} live copy pages for blueprint page : {}", liveCopyPages.size(), blueprintPage.getPath());

        return liveCopyPages;
    }

    @Override
    public List<PageDecorator> getCountryRootPages(final ResourceResolver resourceResolver) {
        final LiveRelationshipManager liveRelationshipManager = resourceResolver.adaptTo(LiveRelationshipManager.class);

        final PageDecorator rootPage = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(
            WatersConstants.ROOT_PATH);

        return rootPage.getChildren(page -> isLiveCopy(page, liveRelationshipManager));
    }

    @Override
    public PageDecorator getCountryRootPage(final ResourceResolver resourceResolver, final String countryCode,
                                            final boolean matchNodeName) {
        return getCountryRootPages(resourceResolver)
            .stream()
            .filter(page -> countryCode.equalsIgnoreCase(page.getLanguage(false).getCountry()))
            .filter(page -> !matchNodeName || countryCode.equalsIgnoreCase(page.getName()))
            .findFirst()
            .orElse(null);
    }

    @Override
    @SuppressWarnings({"squid:S1481" })
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
        final String languageCode, final boolean matchNodeName) {
        @SuppressWarnings({ "squid:S1854", "squid:S1481" })
        final LiveRelationshipManager liveRelationshipManager = resourceResolver.adaptTo(LiveRelationshipManager.class);

        final PageDecorator countryRootPage = getCountryRootPage(resourceResolver, countryCode, matchNodeName);

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
            final Resource resource = page.getContentResource();

            liveCopy = resource != null && liveRelationshipManager.getLiveRelationship(resource, false) != null;
        } catch (WCMException e) {
            LOG.error("error getting live relationship for resource : " + page.getContentResource(), e);
        }

        return liveCopy;
    }
}
