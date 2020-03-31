package com.waters.aem.core.servlets;

import com.day.cq.commons.Externalizer;
import com.google.common.base.Stopwatch;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.apache.sling.settings.SlingSettingsService;
import org.osgi.service.component.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.HostnameVerifier;
import javax.security.cert.CertificateException;
import javax.security.cert.X509Certificate;
import javax.servlet.Servlet;
import java.net.HttpURLConnection;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

/**
 * This servlet is used to expose the AEM content for third party channels.
 */
@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/content")
public class WatersContentService extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(WatersContentService.class);

    @Reference
    private Externalizer externalizer;

    @Reference
    private SlingSettingsService settingsService;

    @Override
    public void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        try {
            LOG.info("New Content Service request");
            response.setContentType("application/json; charset=UTF-8");
            String pagePath = request.getParameter("pagePath");
            final String responseLevel = request.getParameter("depth");
            if (StringUtils.isNotBlank(pagePath) && (pagePath.startsWith(WatersConstants.ROOT_PATH) || pagePath.startsWith(WatersConstants.CUSTOM_ROOT_PATH))) {
                if (pagePath.startsWith(WatersConstants.CUSTOM_ROOT_PATH)) {
                    pagePath = pagePath.replace(WatersConstants.CUSTOM_ROOT_PATH, WatersConstants.ROOT_PATH);
                }
                if (pagePath.endsWith(".html")) {
                    pagePath = pagePath.replace(".html", "");
                }
                if (settingsService.getRunModes().contains(Externalizer.PUBLISH)) {
                    response.getWriter().write(buildJsonForPage(pagePath, responseLevel, request));
                } else {
                    response.getWriter().write("{\"Error\":\"Content Service is supposed to be executed on Publish instance only\"}");
                }
            } else {
                response.getWriter().write("{\n" +
                        "\"Error\": \"Add correct parameters as mentioned below\",\n" +
                        "\"pagePath\": \"Page path exists on AEM\",\n" +
                        "\"depth\": \"Response level 'full' to get Navigation content as well\"}");
            }
        } catch (Exception e) {
            LOG.error("Exception Occurred: {}", e.getMessage());
            LOG.debug("Exception Occurred: {}", e);
        }
    }

    private final String buildJsonForPage(final String path, final String responseLevel, final SlingHttpServletRequest request) {
        final Stopwatch stopwatch = Stopwatch.createStarted();
        String pagePublishCaaSUrl = "";
        String pageJsonResponse = "";
        String navigationCompJsonResponse = "";
        try {
            final ResourceResolver resourceResolver = request.getResourceResolver();
            if (null != resourceResolver.getResource(path)) {
                //TODO:USE CompletableFuture API instead of sequence
                pagePublishCaaSUrl = externalizer.publishLink(resourceResolver, path.concat("/jcr:content.caas.infinity.json")).replace(WatersConstants.CUSTOM_ROOT_PATH, WatersConstants.ROOT_PATH);
                pageJsonResponse = getHttpResponseAsStringForURI(pagePublishCaaSUrl);
                if (StringUtils.isBlank(pageJsonResponse)) {
                    pageJsonResponse = "\"\"";
                }
                if (StringUtils.isNotBlank(responseLevel) && responseLevel.equalsIgnoreCase("full")) {
                    final Resource resource = resourceResolver.getResource(path + "/jcr:content/header/par/navigation");
                    if (null != resource) {
                        navigationCompJsonResponse = getHttpResponseAsStringForURI(pagePublishCaaSUrl.replace("/_jcr_content.caas.infinity.json", "/_jcr_content/header/par/navigation.model.json"));
                        LOG.debug("JSON Content- {\"Page Content\": {} ,\"Navigation Content\": {} }", pageJsonResponse, navigationCompJsonResponse);
                        LOG.info("JSON returned with full page content for: {}", path);
                        LOG.info("JSON fetched from AEM in {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));
                        if (StringUtils.isNotBlank(navigationCompJsonResponse)) {
                            return "{\"Page Content\":" + pageJsonResponse + ",\"Navigation Content\":" + navigationCompJsonResponse + "}";
                        } else {
                            LOG.info("Navigation node exist but it doesn't return any content through model.json call");
                            return "{\"Page Content\":" + pageJsonResponse + ",\"Navigation Content\":" + "\"\"" + "}";
                        }
                    }
                }
            } else {
                return "{\"Error\":\"Path doesn't exist in AEM repo\"}";
            }
        } catch (Exception e) {
            LOG.error("Exception occurred: {}", e.getMessage());
            LOG.debug("Exception occurred: {}", e);
        }
        LOG.info("JSON returned for: {}", path);
        LOG.info("JSON fetched from AEM in {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));
        return "{\"Page Content\":" + pageJsonResponse + "}";
    }

    private final String getHttpResponseAsStringForURI(final String URI) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        String responseEntity = "";
        LOG.debug("Making HTTP/HTTPS call to get the JSON for URI: {}", URI);
        final HttpUriRequest request = RequestBuilder.get(URI)
                .addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType())
                .addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType())
                .build();
        final SSLContextBuilder builder = new SSLContextBuilder().loadTrustMaterial(new TrustSelfSignedStrategy() {
            public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
                return true;
            }
        });
        @SuppressWarnings("deprecation")
        final HostnameVerifier hostnameVerifier = SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER;
        final SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build(), hostnameVerifier);
        try (CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(sslsf).build()) {
            CloseableHttpResponse response = httpClient.execute(request);
            final StatusLine statusLine = response.getStatusLine();
            if (statusLine.getStatusCode() != HttpURLConnection.HTTP_OK) {
                throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
            }
            responseEntity = EntityUtils.toString(response.getEntity(), "UTF-8");
            LOG.debug("HTTP response for URI {} is: {}", URI, responseEntity);
        } catch (Exception e) {
            LOG.info("Exception occured: {}", e.getMessage());
            LOG.debug("Exception occured: {}", e);
        }
        LOG.info("HTTP/HTTPS call successful for URI: {} ", URI);
        return responseEntity;
    }

}
