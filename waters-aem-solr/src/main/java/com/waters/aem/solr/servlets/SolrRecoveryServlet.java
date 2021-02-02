package com.waters.aem.solr.servlets;

import com.day.cq.wcm.api.Page;
import com.google.common.base.Predicates;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.waters.aem.solr.index.SolrIndexService;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.*;
import com.google.common.collect.Lists;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.json.JSONObject;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;
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

	public static final String WATERS = "waters";
	private static final String ADD = "add";
	private static final long serialVersionUID = 1L;
	private static final String DEFAULT_SOLR_INDEX_PID = "com.waters.aem.solr.client.impl.DefaultSolrIndexClient";
	static final int AVAILABLE_PROCESSOR = Runtime.getRuntime().availableProcessors();
	private static final Logger LOG = LoggerFactory.getLogger(SolrRecoveryServlet.class);
	private String collectionName;

	@Reference
	private SolrIndexService solrIndexService;

	@Reference
	private ConfigurationAdmin configAdmin;

	@Reference
	private SolrFullIndexConfigurationImpl solrFullIndexConfigurationImpl;

	@Override
	protected void doGet(@Nonnull final SlingHttpServletRequest request,
			@Nonnull final SlingHttpServletResponse response) throws IOException {
		Configuration configuration = configAdmin.getConfiguration(DEFAULT_SOLR_INDEX_PID);
		Dictionary<String, Object> props = configuration.getProperties();
		long startTime = System.currentTimeMillis();
		final String pagePath = (request.getParameter("pagePath") != null ? request.getParameter("pagePath") : "");
		final String action = (request.getParameter("action") != null ? request.getParameter("action") : "");
		final boolean fullIndex = Boolean.parseBoolean(request.getParameter("fullIndex"));
		URIBuilder builder;
		HttpResponse httpResponse;
		StatusLine statusLine = null;
		String collectionAlias = null;
		Map<String, String> parameters = new HashMap<>();
		final String[] zookeeperUrl = (String[]) props.get("zookeeperUrl");
		final Date date = new Date();
		final SimpleDateFormat formatter = new SimpleDateFormat("ddMMMHHmmss");
		final String collection = WATERS + "-" + formatter.format(date);
		collectionName = collection;
		final boolean enableAuthentication = (boolean) props.get("enableAuthentication");

		ForkJoinPool forkJoinPool;

		final boolean includeDescendants = Boolean.valueOf(request.getParameter("includeDescendants"));

		final PageDecorator page = request.getResourceResolver().adaptTo(PageManagerDecorator.class)
				.getPage(pagePath);
		if ((boolean) props.get("doubleParallelismLevel")) {
			forkJoinPool = new ForkJoinPool(AVAILABLE_PROCESSOR * 2);
		} else {
			forkJoinPool = new ForkJoinPool(AVAILABLE_PROCESSOR);
		}
		LOG.info("Available Processors : {}", AVAILABLE_PROCESSOR);

		boolean success = false;

		if (fullIndex) {
			final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);
			final PageDecorator watersPage = pageManager.getPage("/content/waters");
			List<String>indexPaths = new ArrayList();
			for (final Iterator<Page> iterator = watersPage.listChildren(); iterator.hasNext(); )
			{
				Page childPage = iterator.next();
				String path = childPage.getPath();
				indexPaths.add(path);
			}
			LOG.info("Adding paths to solr full index and count is : {}", indexPaths.size());
			if (indexPaths.size() == 0) {
				LOG.error("No pages for Full indexing: {}", indexPaths.size());
				success = false;
			} else {
				parameters.put("action", "CREATE");
				parameters.put("name", collection);
				parameters.put("numShards", solrFullIndexConfigurationImpl.getNumShards());
				parameters.put("replicationFactor", solrFullIndexConfigurationImpl.getReplicationFactor());
				parameters.put("collection.configName", WATERS);
				builder = getUriBuilder(zookeeperUrl[0], parameters);
				try {
					URI uri = builder.build();
					HttpUriRequest httpUriRequest = RequestBuilder.post(uri).build();
					CloseableHttpClient httpclient = getHttpClient(zookeeperUrl[0], enableAuthentication);
					LOG.info("The Solr Full Index create collection request: {}, ", httpUriRequest);

					httpResponse = httpclient.execute(httpUriRequest);
					statusLine = httpResponse.getStatusLine();
					LOG.info("The Solr Full Index create collection response status: {}", statusLine);

				} catch (Exception exception) {
					LOG.error("Solr Full Index collection creation failed due to {}", exception.getMessage());
				}
				if ((boolean) props.get("enableBatchIndexing")) {
					try {
						if ((statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
							for (String localePath : indexPaths) {
								PageDecorator locale = request.getResourceResolver().adaptTo(PageManagerDecorator.class)
										.getPage(localePath);
								if (locale == null) {
									LOG.info("Locale page not found for path : {}", localePath);
									success = false;
								} else {
									success = addToIndex(locale, true, forkJoinPool, ((Number) props.get("documentsCount")).intValue());
								}
							}
							if (success) {
								parameters.clear();
								parameters.put("action", "LISTALIASES");
								builder = getUriBuilder(zookeeperUrl[0], parameters);
								URI uri = builder.build();
								HttpUriRequest httpUriRequest = RequestBuilder.post(uri).build();
								CloseableHttpClient httpclient = getHttpClient(zookeeperUrl[0], enableAuthentication);

								LOG.info("The Solr Full Index list alias request: {}, ", httpUriRequest);
								httpResponse = httpclient.execute(httpUriRequest);
								statusLine = httpResponse.getStatusLine();

								LOG.info("The Solr Full Index list alias response status: {}", statusLine);
								if ((statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
									String responseString = new BasicResponseHandler().handleResponse(httpResponse);
									JSONObject jsonObject = new JSONObject(responseString);
									JSONObject aliases = jsonObject.getJSONObject("aliases");
									if (aliases.has(WATERS)) {
										collectionAlias = aliases.get(WATERS).toString();
									}
									parameters.clear();
									parameters.put("action", "CREATEALIAS");
									parameters.put("name", WATERS);
									parameters.put("collections", collection);
									builder = getUriBuilder(zookeeperUrl[0], parameters);
									URI uriForAlias = builder.build();
									HttpUriRequest httpUriRequestForAlias = RequestBuilder.post(uriForAlias).build();
									CloseableHttpClient httpclientForAlias = getHttpClient(zookeeperUrl[0], enableAuthentication);

									LOG.info("The Solr Full Index create alias request: {}, ", httpUriRequestForAlias);
									httpResponse = httpclientForAlias.execute(httpUriRequestForAlias);
									statusLine = httpResponse.getStatusLine();

									LOG.info("The Solr Full Index create alias response status: {}", statusLine);
									if ((statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
										parameters.clear();
										parameters.put("action", "DELETE");
										parameters.put("name", collectionAlias);
										builder = getUriBuilder(zookeeperUrl[0], parameters);
										URI uriForDelete = builder.build();
										HttpUriRequest httpUriRequestForDelete = RequestBuilder.post(uriForDelete).build();
										CloseableHttpClient httpclientForDelete = getHttpClient(zookeeperUrl[0], enableAuthentication);

										LOG.info("The Solr Full Index delete collection request: {}, ", httpUriRequestForDelete);
										httpResponse = httpclientForDelete.execute(httpUriRequestForDelete);
										statusLine = httpResponse.getStatusLine();

										LOG.info("The Solr Full Index delete collection response status: {}", statusLine);
									} else
										LOG.error("Solr Full Index create alias failed and response code is {}", statusLine);
								} else
									LOG.error("Solr Full Index list alias failed and response code is {}", statusLine);
							} else LOG.error("Solr Full Indexing was not successful");
						} else
							LOG.error("Solr Full Index collection creation failed and response code is {}", statusLine);
					} catch (Exception e) {
						LOG.error("Solr Full Index collection failed due to {}", e.getMessage());
					}
				} else {
					LOG.error("Enable BatchIndexing for Solr Full Index");
				}

			}
		} else {
			if (ADD.equals(action)) {
				if (page == null) {
					LOG.error("page not found for path : {}, returning error response", pagePath);

					success = false;
				} else {
					LOG.info("adding path to solr index : {}, including descendants : {}", pagePath,
							includeDescendants);
					if ((boolean) props.get("enableBatchIndexing")) {

						try {
							success = addToIndex(page, includeDescendants, forkJoinPool, ((Number) props.get("documentsCount")).intValue());
						} catch (InterruptedException | ExecutionException e) {
							LOG.error("Indexing failed due to {}", e.getMessage());
						}
					} else {
						success = addToIndex(page, includeDescendants);
					}
				}
			} else {
				LOG.info("deleting path from solr index : {}", pagePath);

				if (page == null) {
					// page no longer exists, delete path from index
					List<String> paths = Collections.singletonList("pagePath");
					success = deletePageFromIndex(paths);
				} else {
					// page still exists, delete path from index and include descendants if selected
					if ((boolean) props.get("enableBatchIndexing")) {
						try {
							success = deleteFromIndex(page, includeDescendants, forkJoinPool, ((Number) props.get("documentsCount")).intValue());
						} catch (InterruptedException | ExecutionException e) {
							LOG.error("Deletion of Indexes failed due to {}", e.getMessage());
						}
					} else {
						success = deleteFromIndex(page, includeDescendants);
					}
				}
			}
		}
			if (!success) {
				response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			}
			long endTime = System.currentTimeMillis();
			LOG.info("Total time taken to index {} : {} ms", pagePath, endTime - startTime);
	}

	private CloseableHttpClient getHttpClient(String url, Boolean enableAuthentication) throws URISyntaxException {
		if (enableAuthentication) {
			HttpClientBuilder clientBuilder = HttpClients.custom();
			CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
			Credentials credentials = new UsernamePasswordCredentials("solradmin", "Jm2vY25H8O5b");
			URI uri = new URI("http://" + url);
			AuthScope scope = new AuthScope(uri.getHost(), uri.getPort());
			credentialsProvider.setCredentials(scope, credentials);
			clientBuilder.setDefaultCredentialsProvider(credentialsProvider);
			return clientBuilder.build();
		}
		else return HttpClientBuilder.create().setConnectionManager(new PoolingHttpClientConnectionManager()).build();
	}

	private URIBuilder getUriBuilder(String url, Map<String, String> parameters) throws MalformedURLException {
		URL solrUrl = new URL("http://" + url);
		URIBuilder builder = new URIBuilder()
				.setScheme(solrUrl.getProtocol())
				.setHost(solrUrl.getHost() + ":" + solrUrl.getPort())
				.setPath("/solr/admin/collections");
		for (Map.Entry<String, String> entry : parameters.entrySet()) {
			builder.addParameter(entry.getKey(), entry.getValue());
		}
		return builder;
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
			success = solrIndexService.addPageToIndex(paths, collectionName);
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
