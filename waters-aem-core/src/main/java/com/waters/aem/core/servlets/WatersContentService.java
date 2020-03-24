package com.waters.aem.core.servlets;

import com.day.cq.commons.Externalizer;
import com.google.common.base.Stopwatch;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
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

import javax.servlet.Servlet;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
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
            String pagePath = request.getParameter("path");
            final String responseLevel = request.getParameter("page");
            if (!StringUtils.isBlank(pagePath) && (pagePath.startsWith("/content") || pagePath.startsWith("/nextgen"))) {
                if(pagePath.startsWith("/nextgen"))
                    pagePath = pagePath.replace("/nextgen", "/content/waters");
                if (pagePath.endsWith(".html"))
                    pagePath = pagePath.replace(".html", "");
                if (settingsService.getRunModes().contains(Externalizer.PUBLISH)) {
                    response.getWriter().write(GetJSON(pagePath, responseLevel, request));
                } else {
                    response.getWriter().write("Content Service is supposed to be executed on Publish instance only");
                }
            } else {
                response.getWriter().write("Add correct parameters: \n path = Page path which exists on AEM \n page = Response level \"full\" to get Navigation content along with page content");
            }
        } catch (Exception e) {
            LOG.error("Exception Occurred: " + e.getMessage());
            LOG.debug("Exception Occurred" + e);
        }

    }

    private final String GetJSON(final String path, final String responseLevel, final SlingHttpServletRequest request) {
        final Stopwatch stopwatch = Stopwatch.createStarted();
        String pagePublishCaaSUrl = "", caasResult = "", navResult = "";
        try {
            final ResourceResolver resourceResolver = request.getResourceResolver();
            if (null != resourceResolver.getResource(path)) {
                pagePublishCaaSUrl = externalizer.publishLink(resourceResolver, path.concat(".caas.infinity.json")).replace("/nextgen", "/content/waters");
                caasResult = HttpCall(pagePublishCaaSUrl);
                if (!StringUtils.isBlank(responseLevel) && responseLevel.equals("full")) {
                    final Resource resource = resourceResolver.getResource(path + "/jcr:content/header/par/navigation");
                    if (null != resource) {
                        navResult = HttpCall(pagePublishCaaSUrl.replace(".caas.infinity.json", "/_jcr_content/header/par/navigation.model.json"));
                        LOG.debug("JSON Content-" + "{\"Page Content\":" + caasResult + ",\"Navigation Content\":" + navResult + "}");
                        LOG.info("JSON returned with full page content for: " + path);
                        LOG.info("JSON fetched from AEM in {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));
                        return "{\"Page Content\":" + caasResult + ",\"Navigation Content\":" + navResult + "}";
                    }
                }
            } else {
                return "Path doesn't exist in AEM repo";
            }
        } catch (IOException e) {
            LOG.error("IOException occurred: " + e.getMessage());
            LOG.debug("IOException occurred:" + e);
        }
        LOG.info("JSON returned for: " + path);
        LOG.info("JSON fetched from AEM in {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));
        return "{\"Page Content\":" + caasResult + "}";
    }

    private final String HttpCall(final String URI) throws IOException {
        LOG.debug("Making HTTP call to get the JSON for URI: " + URI);
        final HttpUriRequest request = RequestBuilder.get(URI)
                .addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType())
                .addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType())
                .build();
        final CloseableHttpClient httpClient = HttpClients.createDefault();
        final HttpResponse response = httpClient.execute(request);
        final StatusLine statusLine = response.getStatusLine();
        if (statusLine.getStatusCode() != HttpURLConnection.HTTP_OK) {
            throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
        }
        BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));
        String out;
        StringBuffer res = new StringBuffer();
        while ((out = br.readLine()) != null) {
            res.append(out);
        }
        httpClient.close();
        LOG.debug("Http call successful for uri: " + URI);
        return res.toString();
    }

}
