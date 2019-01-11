package com.waters.aem.akamai.client.impl;

import com.akamai.edgegrid.signer.ClientCredential;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridInterceptor;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridRoutePlanner;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.akamai.client.AkamaiEdgeGridClient;
import com.waters.aem.akamai.client.AkamaiEdgeGridClientConfiguration;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
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
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component(immediate = true, service = AkamaiEdgeGridClient.class)
@Designate(ocd = AkamaiEdgeGridClientConfiguration.class)
public final class DefaultAkamaiEdgeGridClient implements AkamaiEdgeGridClient {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final Logger LOG = LoggerFactory.getLogger(DefaultAkamaiEdgeGridClient.class);

    private volatile HttpClient httpClient;

    private volatile boolean enabled;

    private volatile String network;

    private volatile String hostname;

    @Override
    public boolean invalidate(final String path) throws IOException, URISyntaxException {
        boolean success = true;

        purge(path, "invalidate");

        return success;
    }

    @Override
    public boolean delete(final String path) throws IOException, URISyntaxException {
        boolean success = true;

        purge(path, "delete");

        return success;
    }

    @Activate
    @Modified
    protected void activate(final AkamaiEdgeGridClientConfiguration configuration) {
        final ClientCredential credential = ClientCredential.builder()
            .accessToken(configuration.accessToken())
            .clientSecret(configuration.clientSecret())
            .clientToken(configuration.clientToken())
            .host(configuration.hostname())
            .build();

        httpClient = HttpClientBuilder.create()
            .setConnectionManager(new PoolingHttpClientConnectionManager())
            .addInterceptorFirst(new ApacheHttpClientEdgeGridInterceptor(credential))
            .setRoutePlanner(new ApacheHttpClientEdgeGridRoutePlanner(credential))
            .build();

        enabled = configuration.enabled();
        network = configuration.network();
        hostname = configuration.hostname();
    }

    @Deactivate
    protected void deactivate() {
        httpClient = null;
    }

    private void purge(final String path, final String operation) throws IOException, URISyntaxException {
        if (enabled) {
            final String json = getJson(path);
            final HttpEntity entity = new StringEntity(json, ContentType.APPLICATION_JSON);

            final URI uri = new URIBuilder()
                .setScheme(HttpHost.DEFAULT_SCHEME_NAME)
                .setHost(hostname)
                .setPath(new StringBuilder()
                    .append("/ccu/v3/")
                    .append(operation)
                    .append("/url/")
                    .append(network)
                    .toString())
                .build();

            LOG.info("sending purge request to URI : {}", uri.toString());

            final HttpUriRequest request = RequestBuilder.post(uri)
                .setEntity(entity)
                .addHeader("Accept", "application/json")
                .addHeader("Content-type", "application/json")
                .build();

            final ResponseHandler<String> responseHandler = new BasicResponseHandler();

            final String responseBody = httpClient.execute(request, responseHandler);

            LOG.info("response body : {}", responseBody);
        } else {
            LOG.info("akamai client is disabled, purge request not sent for path : {}", path);
        }
    }

    private String getJson(final String path) throws IOException {
        final Map<String, Object> payload = new HashMap<>();

        payload.put("objects", Collections.singletonList(path));

        return MAPPER.writeValueAsString(payload);
    }
}
