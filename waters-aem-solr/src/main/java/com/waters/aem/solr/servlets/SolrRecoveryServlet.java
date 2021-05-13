package com.waters.aem.solr.servlets;

import com.day.cq.wcm.api.Page;
import com.google.common.base.Predicates;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.waters.aem.solr.index.SolrIndexService;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.apache.solr.client.solrj.SolrServerException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;
import java.util.Collections;
import java.util.Date;
import java.util.Dictionary;
import java.util.HashMap;
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
	private static final String ERROR = "Solr Full Index create alias failed and response code is {}";
	private static final String CREATE = "CREATE";
	private static final String CREATEALIAS = "CREATEALIAS";
	private static final String LIST = "LIST";
	private static final String LISTALIASES = "LISTALIASES";
	private static final String DELETE = "DELETE";
	private static final String FULLTEXT = "FULLTEXT";
	private static final String ACTION = "action";
	private static final String DOCUMENTCOUNT = "documentsCount";
	private static final String HTTPS = "https://";
	private static final int SOLR_PORT = 8983;
	private volatile boolean fullIndexInProgress = false;
	private volatile String collectionName;

	private static final Logger LOG = LoggerFactory.getLogger(SolrRecoveryServlet.class);

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
		final String pagePath = request.getParameter("pagePath");
		final String action = request.getParameter(ACTION);
		final boolean enableBatchIndexing = (boolean) props.get("enableBatchIndexing");
		final boolean enableAuthentication = (boolean) props.get("enableAuthentication");
		final boolean includeDescendants = Boolean.parseBoolean(request.getParameter("includeDescendants"));
		final boolean fullIndex = Boolean.parseBoolean(request.getParameter("fullIndex"));
		final String solrHostUrl = (String) props.get("solrHostName");
		ForkJoinPool forkJoinPool = getForkJoinPool(props);
		final boolean enableDeleteOldCollections = (boolean) props.get("enableDeleteOldCollections");

		final PageDecorator page = getPage(request, pagePath);

		boolean success = false;

		if (fullIndex) {
			try {
				success = getFullIndexingStatus(request, props, enableAuthentication, solrHostUrl, enableBatchIndexing);
			} catch (Exception e) {
				LOG.error("Exception occurred in creating Alias : {}", e.getMessage());
			}
			if (success) {
				try {
					createAlias(collectionName, enableAuthentication, solrHostUrl, enableDeleteOldCollections);
				} catch (IOException | JSONException e) {
					LOG.error("Exception occurred in creating Alias : {}", e.getMessage());
				}
			} else
				LOG.error("Solr Full Indexing was not successful");
		} else {
			collectionName = WATERS;
			if (ADD.equals(action)) {
				success = getSuccessForAddToIndex(page, pagePath, enableBatchIndexing, includeDescendants, forkJoinPool,
						props);
			} else {
				success = getSuccessForDeleteFromIndex(page, pagePath, enableBatchIndexing, includeDescendants,
						forkJoinPool, props);
			}
		}
		getResponse(success, response);
		long endTime = System.currentTimeMillis();
		LOG.debug("Total time taken to index {} : {} ms", pagePath, endTime - startTime);
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
		LOG.debug("addPageToIndex method called having page count {} : ", paths.size());
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
		LOG.debug("deletePageFromIndex method called having page count {} : ", paths.size());
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

	private ForkJoinPool getForkJoinPool(final Dictionary<String, Object> props) {
		if ((boolean) props.get("doubleParallelismLevel")) {
			LOG.debug("Available Processors : {}", AVAILABLE_PROCESSOR);
			return new ForkJoinPool(AVAILABLE_PROCESSOR * 2);
		}
		LOG.debug("Available Processors : {}", AVAILABLE_PROCESSOR);
		return new ForkJoinPool(AVAILABLE_PROCESSOR);
	}
	
	private PageDecorator getPage(final SlingHttpServletRequest request, final String pagePath) {
		final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);
		if (pageManager != null && pagePath != null) {
			return pageManager.getPage(pagePath);
		}
		return null;
	}
	
	private boolean getFullIndexingStatus(final SlingHttpServletRequest request, final Dictionary<String, Object> props,
			boolean enableAuthentication, String solrHostUrl, boolean enableBatchIndexing)
			throws MalformedURLException, InterruptedException, ExecutionException {
		boolean success = false;
		final Date date = new Date();
		final SimpleDateFormat formatter = new SimpleDateFormat("ddMMMHHmmss");
		ForkJoinPool forkJoinPool = getForkJoinPool(props);
		StatusLine statusLine = null;
		List<String> pageIndexPaths = getPageIndexPathsList(request);
		if (!pageIndexPaths.isEmpty()) {
			if (!fullIndexInProgress) {
				collectionName = WATERS + "-" + formatter.format(date);
				fullIndexInProgress = true;
				statusLine = getStatusLine(
						getCollectionActionResponse(collectionName, enableAuthentication, solrHostUrl, CREATE));
				LOG.info("Collection Created with name : {}", collectionName);
				LOG.info("The Solr Full Index create collection response status: {}", statusLine);
			}
			pullLegacyData(collectionName, enableAuthentication, solrHostUrl, FULLTEXT);
			LOG.info("Legacy data completed Indexing : {}", collectionName);
			if (enableBatchIndexing && (statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
				for (String localePath : pageIndexPaths) {
					PageDecorator locale = getPage(request, localePath);
					if (locale != null) {
						success = addToIndex(locale, true, forkJoinPool, (getDocumentCount(props)));
					}
				}
				LOG.info("fullIndexInProgress  flag set to true and indexing is in progress");
			}
		}
		fullIndexInProgress = false;
		return success;
	}
	
	private List<String> getPageIndexPathsList(final SlingHttpServletRequest request) {
		LOG.info("fullIndexInProgress  flag set to true and indexing is in progress");
		List<String> indexPaths = new ArrayList<>();
		PageDecorator watersPage = getPage(request, "/content/waters");
		if (watersPage != null) {
			for (final Iterator<Page> iterator = watersPage.listChildren(); iterator.hasNext();) {
				Page childPage = iterator.next();
				String path = childPage.getPath();
				indexPaths.add(path);
			}
		}
		return indexPaths;
	}
	
	private StatusLine getStatusLine(final HttpResponse httpResponse) {
		if (httpResponse != null) {
			return httpResponse.getStatusLine();
		}
		return null;
	}
	
	private HttpResponse getCollectionActionResponse(String collectionName, boolean enableAuthentication,
			String solrHostUrl, String collectionAction) throws MalformedURLException {
		URIBuilder builder;
		HttpResponse httpResponse = null;
		Map<String, String> parameters = getParamaters(collectionAction);
		builder = getUriBuilder(solrHostUrl, parameters,
				StringUtils.equalsAnyIgnoreCase(collectionAction, FULLTEXT) ? "/solr/" + collectionName + "/dataimport"
						: "/solr/admin/collections");
		try {
			URI uri = builder.build();
			HttpUriRequest httpUriRequest = RequestBuilder.post(uri).build();
			CloseableHttpClient httpclient = getHttpClient(solrHostUrl, enableAuthentication, "solradmin",
					"Jm2vY25H8O5b");
			LOG.info("The Solr Full Index create collection request: {}, ", httpUriRequest);
			httpResponse = httpclient.execute(httpUriRequest);
		} catch (Exception exception) {
			LOG.error("Solr Full Index collection creation failed due to {}", exception.getMessage());
		}
		return httpResponse;
	}
	
	private Map<String, String> getParamaters(final String collectionAction) {
		Map<String, String> parameters = new HashMap<>();
		switch (collectionAction) {
		case FULLTEXT:
			parameters.put("command", "full-import");
			parameters.put("synchronous", "true");
			parameters.put("clean", "false");
			return parameters;
		case CREATEALIAS:
			parameters.clear();
			parameters.put(ACTION, CREATEALIAS);
			parameters.put("name", WATERS);
			parameters.put("collections", collectionName);
			return parameters;
		case LIST:
			parameters.clear();
			parameters.put(ACTION, LIST);
			return parameters;
		case LISTALIASES:
			parameters.clear();
			parameters.put(ACTION, LISTALIASES);
			return parameters;
		case DELETE:
			parameters.clear();
			parameters.put(ACTION, DELETE);
			parameters.put("name", collectionName);
			return parameters;
		default:
			parameters.put(ACTION, CREATE);
			parameters.put("name", collectionName);
			parameters.put("numShards", solrFullIndexConfigurationImpl.getNumShards());
			parameters.put("replicationFactor", solrFullIndexConfigurationImpl.getReplicationFactor());
			parameters.put("collection.configName", WATERS);
			parameters.put("maxShardsPerNode", "2");
			return parameters;
		}
	}

	private URIBuilder getUriBuilder(String url, Map<String, String> parameters, String uri)
			throws MalformedURLException {
		URL solrUrl = new URL(HTTPS + url);
		URIBuilder builder = new URIBuilder().setScheme(solrUrl.getProtocol())
				.setHost(solrUrl.getHost() + ":" + SOLR_PORT).setPath(uri);
		for (Map.Entry<String, String> entry : parameters.entrySet()) {
			builder.addParameter(entry.getKey(), entry.getValue());
		}
		return builder;
	}

	private CloseableHttpClient getHttpClient(String url, Boolean enableAuthentication, String userName,
			String password) throws URISyntaxException {
		if (Boolean.TRUE.equals(enableAuthentication)) {
			HttpClientBuilder clientBuilder = HttpClientBuilder.create();
			CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
			URI uri = new URI(HTTPS + url);
			AuthScope scope = new AuthScope(uri.getHost(), SOLR_PORT);
			if (userName != null && password != null) {
				credentialsProvider.setCredentials(scope, new UsernamePasswordCredentials(userName, password));
			}
			clientBuilder.setDefaultCredentialsProvider(credentialsProvider);
			return clientBuilder.build();
		} else
			return HttpClientBuilder.create().setConnectionManager(new PoolingHttpClientConnectionManager()).build();
	}

	private StatusLine pullLegacyData(String collectionName, boolean enableAuthentication, String solrHostUrl,
			String collectionAction) {
		StatusLine statusLine = null;
		try {
			statusLine = getStatusLine(
					getCollectionActionResponse(collectionName, enableAuthentication, solrHostUrl, collectionAction));
			LOG.info("LegacyData Created with name : {}", collectionName);
		} catch (MalformedURLException e) {
			LOG.error("LegacyData Created with name : {}", e.getMessage());
		}
		return statusLine;
	}
	
	private int getDocumentCount(final Dictionary<String, Object> props) {
		return ((Number) props.get(DOCUMENTCOUNT)).intValue();
	}
	
	private boolean getSuccessForAddToIndex(final PageDecorator page, final String pagePath,
			final boolean enableBatchIndexing, final boolean includeDescendants, final ForkJoinPool forkJoinPool,
			final Dictionary<String, Object> props) {
		boolean success = false;
		LOG.debug("Add path from solr index : {}", pagePath);
		if (page == null) {
			LOG.error("page not found for path : {}, returning error response", pagePath);
		} else {
			LOG.debug("adding path to solr index : {}, including descendants : {}", pagePath, includeDescendants);
			if (enableBatchIndexing) {
				try {
					success = addToIndex(page, includeDescendants, forkJoinPool, (getDocumentCount(props)));
				} catch (Exception e) {
					LOG.error("Deletion of Indexes failed due to {}", e.getMessage());
				}
			} else {
				success = addToIndex(page, includeDescendants);
			}
		}
		return success;
	}

	private boolean getSuccessForDeleteFromIndex(PageDecorator page, String pagePath, boolean enableBatchIndexing,
			boolean includeDescendants, ForkJoinPool forkJoinPool, Dictionary<String, Object> props) {
		boolean success = false;
		LOG.debug("deleting path from solr index : {}", pagePath);
		if (page == null) {
			// page no longer exists, delete path from index
			List<String> paths = Collections.singletonList("pagePath");
			success = deletePageFromIndex(paths);
		} else {
			// page still exists, delete path from index and include descendants if selected
			if (enableBatchIndexing) {
				try {
					success = deleteFromIndex(page, includeDescendants, forkJoinPool, (getDocumentCount(props)));
				} catch (Exception e) {
					LOG.error("Deletion of Indexes failed due to {}", e.getMessage());
				}
			} else {
				success = deleteFromIndex(page, includeDescendants);
			}
		}
		return success;
	}
	
	private void getResponse(final boolean success, final SlingHttpServletResponse response) {
		if (!success) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
	
	private void createAlias(String collectionName, boolean enableAuthentication, String solrHostUrl,
			final boolean enableDeleteOldCollections) throws IOException, JSONException {
		HttpResponse httpResponse;
		StatusLine statusLine = null;
		String collectionAlias = null;
		httpResponse = getCollectionActionResponse(collectionName, enableAuthentication, solrHostUrl, CREATEALIAS);
		statusLine = getStatusLine(httpResponse);
		LOG.info("The Solr Full Index Create Alias response status: {}", statusLine);
		if ((statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
			httpResponse = getCollectionActionResponse(collectionName, enableAuthentication, solrHostUrl, LISTALIASES);
			statusLine = getStatusLine(httpResponse);
			LOG.info("The Solr Full Index List Aliases response status: {}", statusLine);
			if ((statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
				String responseString = new BasicResponseHandler().handleResponse(httpResponse);
				JSONObject jsonObject = new JSONObject(responseString);
				JSONObject aliases = jsonObject.getJSONObject("aliases");
				if (aliases.has(WATERS)) {
					collectionAlias = aliases.get(WATERS).toString();
				}
				if (enableDeleteOldCollections) {
					getCollectionListAndDeleteOldCollections(collectionName, enableAuthentication, solrHostUrl, collectionAlias);
				}
			} else
				LOG.error(ERROR, statusLine);
		} else
			LOG.error(ERROR, statusLine);
	}
	
	private void getCollectionListAndDeleteOldCollections(String collectionName, boolean enableAuthentication, String solrHostUrl,
			String collectionAlias) throws IOException, JSONException {
		HttpResponse httpResponse;
		StatusLine statusLine = null;
		String collectionAction = "";
		collectionAction = LIST;
		httpResponse = getCollectionActionResponse(collectionName, enableAuthentication, solrHostUrl, collectionAction);
		statusLine = getStatusLine(httpResponse);
		LOG.info("The Solr Full Index List Collections response status: {}", statusLine);

		if ((statusLine != null ? statusLine.getStatusCode() : 0) == 200) {
			String collectionListResponseString = new BasicResponseHandler().handleResponse(httpResponse);
			JSONObject collectionListJsonObject = new JSONObject(collectionListResponseString);
			JSONArray collectionsJSONArray = (JSONArray) collectionListJsonObject.get("collections");
			ArrayList<String> collectionsArrayList = new ArrayList<>();
			if (collectionsJSONArray != null) {
				for (int i = 0; i < collectionsJSONArray.length(); i++) {
					collectionsArrayList.add(collectionsJSONArray.getString(i));
				}
			}
			Iterator<String> iterator = collectionsArrayList.iterator();
			while (iterator.hasNext()) {
				String oldCollectionName = iterator.next();
				if (!StringUtils.equalsAnyIgnoreCase(oldCollectionName, collectionAlias)) {
					collectionAction = DELETE;
					statusLine = getStatusLine(getCollectionActionResponse(oldCollectionName, enableAuthentication,
							solrHostUrl, collectionAction));
					LOG.info("The Solr Full Index Delete Collections response status: {}", statusLine);
				}
			}
		} else
			LOG.error(ERROR, statusLine);
	}

}
