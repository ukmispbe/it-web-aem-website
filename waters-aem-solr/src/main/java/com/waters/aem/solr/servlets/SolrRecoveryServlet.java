package com.waters.aem.solr.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.apache.solr.client.solrj.SolrServerException;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.component.annotations.Activate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Predicates;
import com.google.common.collect.Lists;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.waters.aem.solr.client.SolrIndexClientConfiguration;
import com.waters.aem.solr.index.SolrIndexService;

@Component(service = Servlet.class)
@Designate(ocd=SolrIndexClientConfiguration.class)
@SlingServletResourceTypes(
    resourceTypes = "waters/components/utilities/solr-recovery",
    methods = "GET",
    extensions = PathConstants.EXTENSION_JSON,
    selectors = "index"
)
public final class SolrRecoveryServlet extends SlingSafeMethodsServlet {

   	private static final long serialVersionUID = 1L;

	private static final String ADD = "add";

    private static final Logger LOG = LoggerFactory.getLogger(SolrRecoveryServlet.class);

    @Reference
    private SolrIndexService solrIndexService;
   
   private SolrIndexClientConfiguration configuration;
    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) {
    	long startTime = System.currentTimeMillis();
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

                success = addToIndex(page, includeDescendants, configuration.documentsCount());
            }
        } else {
            LOG.info("deleting path from solr index : {}", pagePath);

            if (page == null) {
                // page no longer exists, delete path from index
            	List<String> paths = Collections.singletonList( "pagePath" );
                success = deletePageFromIndex(paths);
            } else {
                // page still exists, delete path from index and include descendants if selected
                success = deleteFromIndex(page, includeDescendants, configuration.documentsCount());
            }
        }

        if (!success) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        long endTime = System.currentTimeMillis();
        LOG.info("Total time taken to index {} : {} ms",pagePath, endTime-startTime);
    }

    private boolean addToIndex(final PageDecorator page, final boolean includeDescendants, int documentCount) {
    	List<String> pagePaths =   getPagePaths(page, includeDescendants)
            .stream()
            .filter(path -> solrIndexService.isIndexed(path, true)).collect(Collectors.toList());
    	return Lists.partition(pagePaths, documentCount).stream().map(this::addPageToIndex).allMatch(result -> true);
    }

    private boolean deleteFromIndex(final PageDecorator page, final boolean includeDescendants, int documentCount) {
    	List<String> pagePaths =   getPagePaths(page, includeDescendants)
                .stream()
                .filter(path -> solrIndexService.isIndexed(path, false)).collect(Collectors.toList());
        	return Lists.partition(pagePaths, documentCount).stream().map(this::deletePageFromIndex).allMatch(result -> true);
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

    private boolean addPageToIndex(final List<String> paths) {
        boolean success;
        LOG.info("addPageToIndex method called having page count {} : " ,paths.size());
        try {
            success = solrIndexService.addPageToIndex(paths);
        } catch (IOException | SolrServerException e) {
            LOG.error("error adding page to index : " + paths, e);

            success = false;
        }

        return success;
    }

    private boolean deletePageFromIndex(final List<String> paths) {
        boolean success;
        LOG.info("deletePageFromIndex method called having page count {} : " ,paths.size());
        try {
            success = solrIndexService.deletePageFromIndex(paths);
        } catch (IOException | SolrServerException e) {
            LOG.error("error deleting page from index : " + paths, e);

            success = false;
        }

        return success;
    }
    @Activate
	protected void activate(SolrIndexClientConfiguration configuration) {
		this.configuration = configuration;
	}
    
}
