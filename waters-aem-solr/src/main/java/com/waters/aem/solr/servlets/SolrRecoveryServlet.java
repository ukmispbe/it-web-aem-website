package com.waters.aem.solr.servlets;

import com.google.common.base.Predicates;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.waters.aem.solr.index.SolrIndexService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.apache.solr.client.solrj.SolrServerException;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = "waters/components/utilities/solr-recovery",
    methods = "GET",
    extensions = PathConstants.EXTENSION_JSON,
    selectors = "index"
)
public final class SolrRecoveryServlet extends SlingSafeMethodsServlet {

    private static final String ADD = "add";

    private static final Logger LOG = LoggerFactory.getLogger(SolrRecoveryServlet.class);

    @Reference
    private SolrIndexService solrIndexService;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) {
        final String pagePath = request.getParameter("pagePath");
        final String action = request.getParameter("action");
        final boolean includeDescendants = Boolean.valueOf(request.getParameter("includeDescendants"));

        final PageDecorator page = request.getResourceResolver().adaptTo(PageManagerDecorator.class)
            .getPage(pagePath);

        boolean success;

        if (ADD.equals(action)) {
            if (page == null) {
                LOG.error("page not found for path : {}, returning error response", pagePath);

                success = false;
            } else {
                LOG.info("adding path to solr index : {}, including descendants : {}", pagePath,
                    includeDescendants);

                success = addToIndex(page, includeDescendants);
            }
        } else {
            LOG.info("deleting path from solr index : {}", pagePath);

            if (page == null) {
                // page no longer exists, delete path from index
                success = deletePageFromIndex(pagePath);
            } else {
                // page still exists, delete path from index and include descendants if selected
                success = deleteFromIndex(page, includeDescendants);
            }
        }

        if (!success) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private boolean addToIndex(final PageDecorator page, final boolean includeDescendants) {
        return getPagePaths(page, includeDescendants)
            .stream()
            .filter(path -> solrIndexService.isIndexed(path, true))
            .map(this :: addPageToIndex)
            .allMatch(result -> true);
    }

    private boolean deleteFromIndex(final PageDecorator page, final boolean includeDescendants) {
        return getPagePaths(page, includeDescendants)
            .stream()
            .filter(path -> solrIndexService.isIndexed(path, false))
            .map(this :: deletePageFromIndex)
            .allMatch(result -> true);
    }

    private List<String> getPagePaths(final PageDecorator page, final boolean includeDescendants) {
        final List<String> pagePaths = new ArrayList<>();

        pagePaths.add(page.getPath());

        if (includeDescendants) {
            final Iterator<PageDecorator> pages = page.listChildPages(Predicates.alwaysTrue(), true);

            while (pages.hasNext()) {
                pagePaths.add(pages.next().getPath());
            }
        }

        return pagePaths;
    }

    private boolean addPageToIndex(final String path) {
        boolean success;

        try {
            success = solrIndexService.addPageToIndex(path);
        } catch (IOException | SolrServerException e) {
            LOG.error("error adding page to index : " + path, e);

            success = false;
        }

        return success;
    }

    private boolean deletePageFromIndex(final String path) {
        boolean success;

        try {
            success = solrIndexService.deletePageFromIndex(path);
        } catch (IOException | SolrServerException e) {
            LOG.error("error deleting page from index : " + path, e);

            success = false;
        }

        return success;
    }
}
