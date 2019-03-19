package com.waters.aem.core.services.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.Predicate;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.eval.JcrPropertyPredicateEvaluator;
import com.day.cq.search.eval.PathPredicateEvaluator;
import com.day.cq.search.eval.TypePredicateEvaluator;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.ApplicationNotesIndexService;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.ArrayList;
import java.util.List;

@Component(service = ApplicationNotesIndexService.class)
public final class DefaultApplicationNotesIndexService implements ApplicationNotesIndexService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultApplicationNotesIndexService.class);

    private static final String RELATIVE_PATH_APPLICATION_NOTES = "/application-notes";

    @Reference
    private QueryBuilder queryBuilder;

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Override
    public PageDecorator getApplicationNotePage(final String literatureCode, final String languageCode) {
        return getApplicationNotesPages(literatureCode)
            .stream()
            .filter(page -> languageCode.equals(page.getLanguage(false).getLanguage()))
            .findFirst()
            .orElse(null);
    }

    @Override
    public List<PageDecorator> getApplicationNotesPages(final String literatureCode) {
        final List<PageDecorator> applicationNotesPages = new ArrayList<>();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            applicationNotesPages.addAll(findApplicationNotesPages(resourceResolver, WatersConstants.ROOT_PATH,
                literatureCode));
        } catch (LoginException e) {
            LOG.error("error authenticating resource resolver", e);
        }

        return applicationNotesPages;
    }

    @Override
    public PageDecorator getApplicationNotePageForLanguage(final PageDecorator currentPage,
        final String languageCode) {
        final String literatureCode = currentPage.get(ApplicationNotes.PROPERTY_LITERATURE_CODE, "");

        final String siteRootPath = currentPage.getAbsoluteParent(WatersConstants.LEVEL_SITE_ROOT).getPath();
        final String applicationNotesRootPath = siteRootPath + "/" + languageCode + RELATIVE_PATH_APPLICATION_NOTES;

        LOG.info("finding application notes page with literature code : {} for root path : {}", literatureCode,
            applicationNotesRootPath);

        return getApplicationNotesPages(literatureCode)
            .stream()
            .findFirst()
            .orElse(null);
    }

    private List<PageDecorator> findApplicationNotesPages(final ResourceResolver resourceResolver,
        final String rootPath, final String literatureCode) {
        final PredicateGroup predicateGroup = getPredicateGroup(rootPath, literatureCode);

        final List<PageDecorator> applicationNotesPages = new ArrayList<>();

        final SearchResult searchResult = queryBuilder.createQuery(predicateGroup,
            resourceResolver.adaptTo(Session.class)).getResult();

        for (final Hit hit : searchResult.getHits()) {
            try {
                applicationNotesPages.add(hit.getResource().adaptTo(PageDecorator.class));
            } catch (RepositoryException e) {
                LOG.error("error getting resource from search result hit", e);
            }
        }

        return applicationNotesPages;
    }

    private PredicateGroup getPredicateGroup(final String rootPath, final String literatureCode) {
        final PredicateGroup predicateGroup = new PredicateGroup();

        predicateGroup.add(new Predicate(TypePredicateEvaluator.TYPE).set(TypePredicateEvaluator.TYPE,
            NameConstants.NT_PAGE));

        predicateGroup.add(new Predicate(PathPredicateEvaluator.PATH).set(PathPredicateEvaluator.PATH, rootPath));

        predicateGroup.add(new Predicate(JcrPropertyPredicateEvaluator.PROPERTY)
            .set(JcrPropertyPredicateEvaluator.PROPERTY, JcrConstants.JCR_CONTENT + "/"
                + ApplicationNotes.PROPERTY_LITERATURE_CODE)
            .set(JcrPropertyPredicateEvaluator.VALUE, literatureCode));

        return predicateGroup;
    }
}
