package com.waters.aem.hybris.client.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.waters.aem.hybris.client.HybrisClient;
import com.waters.aem.hybris.client.HybrisClientConfiguration;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.models.ProductList;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Map;

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;

@Component(service = HybrisClient.class)
@Designate(ocd = HybrisClientConfiguration.class)
public final class DefaultHybrisClient implements HybrisClient {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisClient.class);

    private static final ObjectMapper MAPPER = new ObjectMapper().configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

    private volatile CloseableHttpClient httpClient;

    private volatile String hostname;

    private volatile String catalogId;

    private volatile String catalogVersionId;

    private volatile String webRootCategoryId;

    private volatile Integer pageSize;

    @Override
    public Category getRootCategory() throws URISyntaxException, IOException {
        final String path = new StringBuilder()
            .append("/catalogs/")
            .append(catalogId)
            .append("/")
            .append(catalogVersionId)
            .append("/categories/")
            .append(webRootCategoryId)
            .toString();

        final Map<String, String> queryParams = Collections.singletonMap("fields", "FULL");

        return getModel(path, queryParams, Category.class);
    }

    @Override
    public ProductList getProductList(final Integer pageNumber) throws URISyntaxException, IOException {
        return getProductList(pageNumber, null);
    }

    @Override
    public ProductList getProductList(final Integer pageNumber, final Calendar modifiedAfterTime)
        throws URISyntaxException, IOException {
        final ImmutableMap.Builder<String, String> queryParamsBuilder = new ImmutableMap.Builder<String, String>()
            .put("catalog", catalogId)
            .put("version", catalogVersionId)
            .put("currentPage", String.valueOf(pageNumber))
            .put("pageSize", String.valueOf(pageSize))
            .put("fields", "FULL");

        if (modifiedAfterTime != null) {
            queryParamsBuilder.put("timestamp", new SimpleDateFormat(HybrisImporterConstants.DATE_FORMAT_PATTERN)
                .format(modifiedAfterTime.getTime()));
        }

        return getModel("/export/products", queryParamsBuilder.build(), ProductList.class);
    }

    @Override
    public Product getProduct(final String productCode) throws URISyntaxException, IOException {
        final String path = new StringBuilder()
            .append("/products/")
            .append(productCode)
            .toString();

        final Map<String, String> queryParams = Collections.singletonMap("fields", "FULL");

        return getModel(path, queryParams, Product.class);
    }

    @Activate
    protected void activate(final HybrisClientConfiguration configuration) {
        // create OCC client
        httpClient = HttpClientBuilder.create()
            .setConnectionManager(new PoolingHttpClientConnectionManager())
            .build();

        modified(configuration);
    }

    @Modified
    protected void modified(final HybrisClientConfiguration configuration) {
        hostname = configuration.hostname();
        catalogId = configuration.catalogId();
        catalogVersionId = configuration.catalogVersionId();
        webRootCategoryId = configuration.webRootCategoryId();
        pageSize = configuration.pageSize();
    }

    @Deactivate
    protected void deactivate() throws IOException {
        httpClient.close();
    }

    private <T> T getModel(final String path, final Map<String, String> queryParams, final Class<T> clazz)
        throws IOException, URISyntaxException {
        final URI uri = buildUri(path, queryParams);

        LOG.info("sending request for URI : {}", uri.toString());

        final HttpUriRequest request = RequestBuilder.get(uri)
            .addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType())
            .addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType())
            .build();

        final HttpResponse response = httpClient.execute(request);

        final StatusLine statusLine = response.getStatusLine();
        final String responseBody = EntityUtils.toString(response.getEntity());

        LOG.debug("response body : {}", responseBody);

        if (statusLine.getStatusCode() >= 300) {
            throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
        }

        return MAPPER.readValue(responseBody, clazz);
    }

    private URI buildUri(final String path, final Map<String, String> queryParams) throws URISyntaxException {
        final URIBuilder builder = new URIBuilder()
            .setScheme("https")
            .setHost(hostname)
            .setPath(new StringBuilder()
                .append("/waterscommercewebservices/v2/waters")
                .append(path)
                .toString());

        queryParams.forEach(builder :: addParameter);

        return builder.build();
    }
}
