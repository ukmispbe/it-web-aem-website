package com.waters.aem.core.email.client.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.email.client.EmailTemplateClient;
import com.waters.aem.core.email.client.EmailTemplateClientConfiguration;
import com.waters.aem.core.email.template.SESEmailTemplate;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
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
import java.util.Map;

@Component(service = EmailTemplateClient.class)
@Designate(ocd = EmailTemplateClientConfiguration.class)
public class DefaultEmailTemplateClient implements EmailTemplateClient {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultEmailTemplateClient.class);

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private volatile CloseableHttpClient httpClient;

    private volatile String hostname;

    private volatile String setTemplateEndpoint;

    private volatile String apiKey;

    @Override
    public void setTemplate(final SESEmailTemplate template) throws URISyntaxException, IOException {
        final URI uri = buildUri(setTemplateEndpoint, Collections.emptyMap());

        LOG.info("sending request for URI : {}", uri.toString());

        // create request object with body
        final HttpUriRequest request = RequestBuilder.post(uri)
                .addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType())
                .addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType())
                .addHeader("X-Api-Key",apiKey)
                .setEntity(new StringEntity(MAPPER.writeValueAsString(template.toMap())))
                .build();

        // execute request
        final HttpResponse response = httpClient.execute(request);

        final StatusLine statusLine = response.getStatusLine();

        LOG.debug("response code : {}", statusLine.getStatusCode());

        final boolean isCreated = statusLine.getStatusCode() == 201;
        final boolean isUpdated = statusLine.getStatusCode() == 200;
        
        if (isCreated || isUpdated) {
            LOG.debug("email template " + (isUpdated ? "updated" : "created") + " successfully.");
        }

        if (statusLine.getStatusCode() >= 300) {
            throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
        }
    }

    @Activate
    protected void activate(final EmailTemplateClientConfiguration configuration) {
        httpClient = HttpClientBuilder.create()
                .setConnectionManager(new PoolingHttpClientConnectionManager())
                .build();

        modified(configuration);
    }

    @Modified
    protected void modified(final EmailTemplateClientConfiguration configuration) {
        hostname = configuration.hostname();
        setTemplateEndpoint = configuration.setTemplateEndpoint();
        apiKey =  configuration.setApiKey();
    }

    @Deactivate
    protected void deactivate() throws IOException {
        httpClient.close();
    }

    private URI buildUri(final String path, final Map<String, String> queryParams) throws URISyntaxException {
        final URIBuilder builder = new URIBuilder()
                .setScheme("https")
                .setHost(hostname)
                .setPath(new StringBuilder()
                    .append(path)
                    .toString());

        queryParams.forEach(builder :: addParameter);

        return builder.build();
    }
}
