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
import com.google.common.collect.Lists;
import java.util.Collections;
import java.util.Dictionary;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;

@Component(service = Servlet.class)
@SlingServletResourceTypes(
		resourceTypes = "waters/components/utilities/solr-recovery",
		methods = "GET",
		extensions = PathConstants.EXTENSION_JSON,
		selectors = "index"
		)
public final class SolrRecoveryServlet extends SlingSafeMethodsServlet {

	private static final String ADD = "add";
	private static final long serialVersionUID = 1L;
	private static final String DEFAULT_SOLR_INDEX_PID = "com.waters.aem.solr.client.impl.DefaultSolrIndexClient";
	static final int AVAILABLE_PROCESSOR = Runtime.getRuntime().availableProcessors();

	private static final Logger LOG = LoggerFactory.getLogger(SolrRecoveryServlet.class);

	@Reference
	private SolrIndexService solrIndexService;

	@Reference
	private ConfigurationAdmin configAdmin;

	@Override
	protected void doGet(@Nonnull final SlingHttpServletRequest request,
			@Nonnull final SlingHttpServletResponse response) throws IOException {
		Configuration configuration = configAdmin.getConfiguration(DEFAULT_SOLR_INDEX_PID);
		Dictionary<String, Object> props = configuration.getProperties();
		long startTime = System.currentTimeMillis();
		final String pagePath = request.getParameter("pagePath");
		final String action = request.getParameter("action");
		ForkJoinPool forkJoinPool;

		final boolean includeDescendants = Boolean.valueOf(request.getParameter("includeDescendants"));

		final PageDecorator page = request.getResourceResolver().adaptTo(PageManagerDecorator.class)
				.getPage(pagePath);
		if((boolean) props.get("doubleParallelismLevel")) {
			forkJoinPool = new ForkJoinPool(AVAILABLE_PROCESSOR*2);
		}
		else {
			forkJoinPool = new ForkJoinPool(AVAILABLE_PROCESSOR);
		}
		LOG.info("Available Processors : {}", AVAILABLE_PROCESSOR);

		boolean success = false;

		if (ADD.equals(action)) {
			if (page == null) {
				LOG.error("page not found for path : {}, returning error response", pagePath);

				success = false;
			} else {
				LOG.info("adding path to solr index : {}, including descendants : {}", pagePath,
						includeDescendants);
				if((boolean) props.get("enableBatchIndexing")) {

					try {
                        success = addToIndex(page, includeDescendants,forkJoinPool, ((Number)props.get("documentsCount")).intValue());
					} catch (InterruptedException | ExecutionException e) {
						LOG.error("Indexing failed due to {}",e.getMessage());
					}
				}
				else {
					success = addToIndex(page, includeDescendants);
				}
			}
		} else {
			LOG.info("deleting path from solr index : {}", pagePath);

			if (page == null) {
				// page no longer exists, delete path from index
				List<String> paths = Collections.singletonList( "pagePath" );
				success = deletePageFromIndex(paths);
			} else {
				// page still exists, delete path from index and include descendants if selected
				if((boolean) props.get("enableBatchIndexing")) {
					try {
						success = deleteFromIndex(page, includeDescendants,forkJoinPool, ((Number)props.get("documentsCount")).intValue());
					} catch (InterruptedException | ExecutionException e) {
						LOG.error("Deletion of Indexes failed due to {}",e.getMessage());
					}
				}
				else {
					success = deleteFromIndex(page, includeDescendants);
				}
			}
		}

		if (!success) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		long endTime = System.currentTimeMillis();
		LOG.info("Total time taken to index {} : {} ms",pagePath, endTime-startTime);
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

	private boolean addToIndex(final PageDecorator page, final boolean includeDescendants,ForkJoinPool forkJoinPool,int documentCount) throws InterruptedException, ExecutionException {
		List<String> pagePaths =   getPagePaths(page, includeDescendants).stream().filter(path -> solrIndexService.isIndexed(path, true)).collect(Collectors.toList());
		List<List<String>> lists = Lists.partition(pagePaths, documentCount);
		return forkJoinPool.submit(() ->lists.parallelStream().map(this::addPageToIndex).allMatch(result -> true)).get(); 
	}
	private boolean deleteFromIndex(final PageDecorator page, final boolean includeDescendants,ForkJoinPool forkJoinPool, int documentCount) throws InterruptedException, ExecutionException {
		List<String> pagePaths =   getPagePaths(page, includeDescendants).stream().filter(path -> solrIndexService.isIndexed(path, false)).collect(Collectors.toList());
		List<List<String>> lists = Lists.partition(pagePaths, documentCount);
		return forkJoinPool.submit(() ->lists.parallelStream().map(this::deletePageFromIndex).allMatch(result -> true)).get(); 
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
