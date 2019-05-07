package com.waters.aem.hybris.client.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.hybris.client.HybrisClient;
import com.waters.aem.hybris.client.HybrisClientConfiguration;
import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.models.Product;
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

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;

@Component(service = HybrisClient.class)
@Designate(ocd = HybrisClientConfiguration.class)
public final class DefaultHybrisClient implements HybrisClient {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisClient.class);

    private static final ObjectMapper MAPPER = new ObjectMapper().configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

    private static final ContentType JSON = ContentType.APPLICATION_JSON;

    private volatile CloseableHttpClient httpClient;

    private volatile String hostname;

    private volatile String catalogId;

    private volatile String catalogVersionId;

    private volatile String webRootCategoryId;

    @Override
    public Category getRootCategory() throws URISyntaxException, IOException {
        final URI uri = new URIBuilder()
            .setScheme("https")
            .setHost(hostname)
            .setPath(new StringBuilder()
                .append("/waterscommercewebservices/v2/waters/catalogs/")
                .append(catalogId)
                .append("/")
                .append(catalogVersionId)
                .append("/categories/")
                .append(webRootCategoryId)
                .toString())
            .build();

        LOG.debug("getting root category for URI : {}", uri.toString());

        final HttpUriRequest request = RequestBuilder.get(uri)
            .addHeader(HttpHeaders.ACCEPT, JSON.getMimeType())
            .addHeader(HttpHeaders.CONTENT_TYPE, JSON.getMimeType())
            .build();

        final HttpResponse response = httpClient.execute(request);

        final StatusLine statusLine = response.getStatusLine();
        final String responseBody = EntityUtils.toString(response.getEntity());

        LOG.debug("response body : {}", responseBody);

        if (statusLine.getStatusCode() >= 300) {
            throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
        }

        return MAPPER.readValue(responseBody, Category.class);
    }

    @Override
    public Product getProduct(final String productId) {
        return null;
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
    }

    @Deactivate
    protected void deactivate() throws IOException {
        httpClient.close();
    }
}
