package com.waters.aem.akamai.client.impl;

import com.akamai.edgegrid.signer.ClientCredential;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridInterceptor;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridRoutePlanner;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.akamai.client.AkamaiEdgeGridClient;
import com.waters.aem.akamai.client.AkamaiEdgeGridClientConfiguration;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
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
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component(immediate = true, service = AkamaiEdgeGridClient.class)
@Designate(ocd = AkamaiEdgeGridClientConfiguration.class)
public final class DefaultAkamaiEdgeGridClient implements AkamaiEdgeGridClient {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final Logger LOG = LoggerFactory.getLogger(DefaultAkamaiEdgeGridClient.class);

    private static final ContentType JSON = ContentType.APPLICATION_JSON;

    private volatile CloseableHttpClient httpClient;

    private volatile boolean enabled;

    private volatile String network;

    private volatile String baseUrl;

    @Override
    public void invalidate(final String path) throws IOException {
        purge(path, "invalidate");
    }

    @Override
    public void delete(final String path) throws IOException {
        purge(path, "delete");
    }

    @Activate
    @Modified
    protected void activate(final AkamaiEdgeGridClientConfiguration configuration) {
        final ClientCredential credential = ClientCredential.builder()
            .accessToken(configuration.accessToken())
            .clientSecret(configuration.clientSecret())
            .clientToken(configuration.clientToken())
            // .host(configuration.hostname())
            .build();

        httpClient = HttpClientBuilder.create()
            .setConnectionManager(new PoolingHttpClientConnectionManager())
            .addInterceptorFirst(new ApacheHttpClientEdgeGridInterceptor(credential))
            .setRoutePlanner(new ApacheHttpClientEdgeGridRoutePlanner(credential))
            .build();

        enabled = configuration.enabled();
        network = configuration.network();
        baseUrl = configuration.baseUrl();
    }

    @Deactivate
    protected void deactivate() throws IOException {
        httpClient.close();
    }

    private void purge(final String path, final String operation) throws IOException {
        if (enabled) {
            final String json = getJson(path);
            final HttpEntity entity = new StringEntity(json, JSON);

            final String uri = new StringBuilder()
                .append(baseUrl)
                .append("/ccu/v3/")
                .append(operation)
                .append("/url/")
                .append(network)
                .toString();

            LOG.info("sending purge request to URI : {} with JSON entity : {}", uri, json);

            final HttpUriRequest request = RequestBuilder.post(uri)
                .setEntity(entity)
                .addHeader("Accept", JSON.getMimeType())
                .addHeader("Content-Type", JSON.getMimeType())
                .build();

            final HttpResponse response = httpClient.execute(request);

            final StatusLine statusLine = response.getStatusLine();
            final String responseBody = EntityUtils.toString(response.getEntity());

            LOG.info("response body : {}", responseBody);

            if (statusLine.getStatusCode() >= 300) {
                throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
            }
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
