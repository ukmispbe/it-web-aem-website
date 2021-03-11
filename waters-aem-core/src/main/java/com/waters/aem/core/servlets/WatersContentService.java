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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;
import java.util.Objects;

import java.util.concurrent.TimeUnit;

/**
 * This servlet is used to expose the AEM content for third party channels.
 */
@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/content")
@Designate(ocd = WatersContentService.Config.class)
public class WatersContentService extends SlingAllMethodsServlet {

    private static final String HTML = ".html";
    private static final Logger LOG = LoggerFactory.getLogger(WatersContentService.class);

    @Reference
    private SlingSettingsService settingsService;

    private volatile String hostName;

    private String[] keys;

    private boolean sanitizeResponse;

    private boolean labelsRefactoring;

    @Override
    public void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        try {
            LOG.info("New Content Service request");
            response.setContentType("application/json; charset=UTF-8");
            String pagePath = request.getParameter("pagePath");
            final String responseLevel = request.getParameter("depth");
            if (settingsService.getRunModes().contains(Externalizer.PUBLISH)) {
                if (StringUtils.isNotBlank(hostName)) {
                    if (StringUtils.isNotBlank(pagePath) && (pagePath.startsWith(WatersConstants.ROOT_PATH) || pagePath.startsWith(WatersConstants.CUSTOM_ROOT_PATH) || pagePath.startsWith(WatersConstants.ORDER_ROOT_PATH))) {
                        String processedPath = getProcessedPath(pagePath);
                        response.getWriter().write(buildJsonForPage(processedPath, responseLevel, request));
                    } else {
                        response.getWriter().write("{\n" +
                                "\"Error\": \"Add correct parameters as mentioned below\",\n" +
                                "\"pagePath\": \"Page path exists on AEM\",\n" +
                                "\"depth\": \"Response level 'full' to get Navigation content as well \"}");
                    }
                } else {
                    response.getWriter().write("{\"Error\":\"Please add host name in Waters Content Service Configuration\"}");
                }
            } else {
                response.getWriter().write("{\"Error\":\"Content Service is supposed to be executed on Publish instance only\"}");
            }
        } catch (Exception e) {
            LOG.error("Exception Occurred: {}", e);
        }
    }

    private final String sanitizeJSON(String stringJson) throws JSONException {
        JSONObject obj = new JSONObject(stringJson);
        for (String key : keys) {
            removeJSONKeys(obj, key);
        }
        return obj.toString();
    }

    private final void removeJSONKeys(JSONObject jsonObject, String keyValue) {
        if(jsonObject.toString().contains(keyValue)) {
            jsonObject.remove(keyValue);
            Iterator<String> it = jsonObject.keys();
            while (it.hasNext()) {
                String key = it.next();
                Object childObj = null;
                try {
                    childObj = jsonObject.get(key);
                } catch (JSONException e) {
                    LOG.debug("Error while removing the keys: {}", e.getMessage());
                }
                if (childObj instanceof JSONObject) {
                    removeJSONKeys(((JSONObject) childObj), keyValue);
                }
                if (childObj instanceof JSONArray) {
                    JSONArray arrayChildObjs = ((JSONArray) childObj);
                    int size = arrayChildObjs.length();
                    for (int i = 0; i < size; i++) {
                        try {
                            removeJSONKeys(arrayChildObjs.getJSONObject(i), keyValue);
                        } catch (JSONException e) {
                            LOG.debug("Error while removing the keys: {}", e.getMessage());
                        }
                    }
                }
            }
        }
    }

    private final String buildJsonForPage(final String path, final String responseLevel, final SlingHttpServletRequest request) throws JSONException {
        final Stopwatch stopwatch = Stopwatch.createStarted();
        final String pageContentJsonConstant = "{\"Page Content\":";
        final String navigationContentJsonConstant = ",\"Navigation Content\":";
        String pagePublishCaaSUrl = "";
        String pageJsonResponse = "";
        String navigationCompJsonResponse = "";
        try {
            final ResourceResolver resourceResolver = request.getResourceResolver();
            if (null != resourceResolver.getResource(path)) {
                pagePublishCaaSUrl = hostName.concat(path.concat("/_jcr_content.caas.infinity.json")).replace(WatersConstants.CUSTOM_ROOT_PATH, WatersConstants.ROOT_PATH);
                pageJsonResponse = getHttpResponseAsStringForURI(pagePublishCaaSUrl);
                if (StringUtils.isNotBlank(responseLevel) && responseLevel.equalsIgnoreCase("full")) {
                    final Resource resource = resourceResolver.getResource(path + "/jcr:content/header/par/navigation");
                    if (null != resource) {
                        navigationCompJsonResponse = getHttpResponseAsStringForURI(pagePublishCaaSUrl.replace("/_jcr_content.caas.infinity.json", "/_jcr_content/header/par/navigation.model.json"));
                        navigationCompJsonResponse = navigationCompJsonResponse.replace("/content/waters", "/nextgen");
                        LOG.debug("JSON Content- {\"Page Content\": {} ,\"Navigation Content\": {} }", pageJsonResponse, navigationCompJsonResponse);
                        if (StringUtils.isNotBlank(navigationCompJsonResponse)) {
                            LOG.info("JSON returned with full page content for: {}", path);
                            LOG.info("JSON fetched from AEM in {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));
                            pageJsonResponse = updateLanguageListJson(pageJsonResponse, resourceResolver, path);
                            pageJsonResponse = pageJsonResponse.replace("/content/waters", "/nextgen");
                            if (sanitizeResponse && keys.length > 1) {
                                pageJsonResponse = sanitizeJSON(pageJsonResponse);
                                navigationCompJsonResponse = sanitizeJSON(navigationCompJsonResponse);
                            }
                            if (labelsRefactoring) {
                                pageJsonResponse = refactorLabelsConfig(pageJsonResponse, path);
                            }
                            return pageContentJsonConstant + pageJsonResponse + navigationContentJsonConstant + navigationCompJsonResponse + "}";
                        }
                    }
                }
            } else {
                return "{\"Error\":\"Path doesn't exist in AEM repo\"}";
            }
        } catch (Exception e) {
            LOG.error("Exception occurred in buildJsonForPage() method of WatersContentService class: ", e);
        }
        LOG.info("JSON returned for: {}", path);
        LOG.info("JSON fetched from AEM in {} ms", stopwatch.elapsed(TimeUnit.MILLISECONDS));
        if (sanitizeResponse && keys.length > 1) {
            pageJsonResponse = sanitizeJSON(pageJsonResponse);
        }
        if (labelsRefactoring) {
            pageJsonResponse = refactorLabelsConfig(pageJsonResponse, path);
        }
        return pageContentJsonConstant + pageJsonResponse + "}";
    }

    private String updateLanguageListJson(String pageJsonResponse, ResourceResolver resourceResolver, String path) {
        if (path.contains("cart-checkout")) {
            try {
                final JSONObject cartPageJson = new JSONObject(pageJsonResponse);
                final JSONObject cartFooterJson = cartPageJson.getJSONObject("footer");
                final JSONObject languageListJsonValue = updateLanguageListJsonValue(resourceResolver, path);
                cartFooterJson.put("languageListJson", languageListJsonValue.toString());
                cartPageJson.put("footer", cartFooterJson);
                return cartPageJson.toString();
            } catch (JSONException e) {
                LOG.error("Exception occurred in updateLanguageListJson()/updateLanguageListJsonValue() method of WatersContentService class: ", e);
            }
        }
        return pageJsonResponse;
    }

    private String refactorLabelsConfig(String pageJsonResponse, String path){
        if (path.contains("cart-checkout")) {
            try{
                final JSONObject cartPageJson = new JSONObject(pageJsonResponse);
                final JSONObject rootJson = cartPageJson.getJSONObject("root");
                Map<String, String> labelsMap = new HashMap<>();
                Map<String, String> configsMap = new HashMap<>();
                getMap(cartPageJson.toString(),"root", WatersConstants.LABELS, labelsMap);
                getMap(cartPageJson.toString(),"root", WatersConstants.CONFIGS, configsMap);
                Iterator<String> it = rootJson.keys();
                ArrayList<Object> toRemove = new ArrayList<>();
                while (it.hasNext()) {
                    String key = it.next();
                    if(key.startsWith("labels_")){
                        toRemove.add(key);
                    }
                }
                for (Object o : toRemove) {
                    rootJson.remove((String)o);
                }
                rootJson.put(WatersConstants.CONFIGS,configsMap.size() > 0 ? new JSONObject(configsMap) : "");
                rootJson.put(WatersConstants.LABELS,labelsMap.size() > 0 ? new JSONObject(labelsMap) : "");
                cartPageJson.put("root",rootJson);
                return cartPageJson.toString();
            } catch (JSONException e) {
                LOG.error("JSONException occurred in refactorLabelsConfig() method of WatersContentService class: ", e);
            }
        }
        return pageJsonResponse;
    }

    private void getMap(String jsonString, String element, String type, Map map) {
        String listType= null;
        String jsonKey = null;
        String jsonValue = null;
        if(type.equalsIgnoreCase(WatersConstants.LABELS)){
            listType="labelList"; jsonKey="labelKey"; jsonValue="labelValue";
        }else if(type.equalsIgnoreCase(WatersConstants.CONFIGS)){
            listType="configList"; jsonKey="text"; jsonValue="link";
        }
        try {
            if(jsonString.contains(element)) {
                JSONObject jsonObject = new JSONObject(jsonString).getJSONObject(element);
                Iterator<String> iterator = jsonObject.keys();
                while (iterator.hasNext()) {
                    String key = iterator.next();
                    if (jsonObject.get(key) instanceof JSONObject) {
                        JSONObject innerJObject = jsonObject.getJSONObject(key);
                        if (!innerJObject.has(jsonKey)) {
                            getMap(innerJObject.toString(), listType, type, map);
                        } else {
                            map.put(innerJObject.getString(jsonKey), innerJObject.getString(jsonValue));
                        }
                    }
                }
            }
        } catch (JSONException e) {
            LOG.error("JSONException occurred in getMap() method of WatersContentService class:", e);
        }
    }

    private JSONObject updateLanguageListJsonValue(ResourceResolver resourceResolver, String path) throws JSONException {
        final JSONObject languageListJsonValue = new JSONObject(Objects.requireNonNull(
                Objects.requireNonNull(resourceResolver.getResource(
                        path.substring(0, path.indexOf("/cart-checkout")) + "/jcr:content/footer"))
                        .getValueMap()
                        .get("languageListJson", String.class)));

        final Iterator<?> iterator = languageListJsonValue.keys();
        while (iterator.hasNext()) {
            final String key = String.valueOf(iterator.next());
            final String value = languageListJsonValue.getString(key);
            languageListJsonValue.put(key, value.substring(0, value.indexOf(HTML)) + "/cart-checkout.html");
        }
        return languageListJsonValue;
    }

    private final String getHttpResponseAsStringForURI(final String URI) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        String responseEntity = "";
        LOG.debug("Making HTTP/HTTPS call to get the JSON for URI: {}", URI);
        final HttpUriRequest request = RequestBuilder.get(URI)
                .addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType())
                .addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType())
                .build();
        final SSLContextBuilder builder = new SSLContextBuilder().loadTrustMaterial(new TrustSelfSignedStrategy() {
            @SuppressWarnings("deprecation")
            public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
                return true;
            }
        });
        @SuppressWarnings("deprecation") final HostnameVerifier hostnameVerifier = SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER;
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
            LOG.error("Exception occured in getHttpResponseAsStringForURI() method in WatersContentService class: ", e);
        }
        if (StringUtils.isBlank(responseEntity)) {
            responseEntity = "\"\"";
        }
        LOG.info("HTTP/HTTPS call successful for URI: {} ", URI);
        return responseEntity;
    }

    private String getProcessedPath(String pagePath) {
        if (pagePath.startsWith(WatersConstants.CUSTOM_ROOT_PATH)) {
            pagePath = pagePath.replace(WatersConstants.CUSTOM_ROOT_PATH, WatersConstants.ROOT_PATH);
        }
        if (pagePath.endsWith(HTML)) {
            pagePath = pagePath.replace(HTML, "");
        }
        return pagePath;
    }

    @Activate
    @Modified
    protected void activate(final WatersContentService.Config configuration) {
        hostName = configuration.getHostName();
        keys = configuration.getKeys();
        sanitizeResponse = configuration.enableSanitization();
        labelsRefactoring = configuration.enableLabelsRefactoring();
    }

    @ObjectClassDefinition(name = "Waters Content Service Configuration")
    public @interface Config {
        @AttributeDefinition(name = "Host Name", description = "Set the publish host name e.g. http://www.hostname.com ")
        String getHostName();

        @AttributeDefinition(name = "Refactor Labels component", description = "If true, labels component data will be simplified")
        boolean enableLabelsRefactoring() default false;


        @AttributeDefinition(name = "Sanitize JSON response", description = "If true, elements in keys config will be removed from the repsonse.")
        boolean enableSanitization() default true;

        @AttributeDefinition(name = "Keys", description = "Remove mentioned keys from content service response", type = AttributeType.STRING)
        String[] getKeys() default {"jcr:baseVersion", "cq:template", "jcr:mixinTypes", "cq:lastRolledout", "cq:LiveSyncConfig", "cq:lastModifiedBy", "cq:lastModified", "cq:lastRolledoutBy", "jcr:primaryType", "jcr:lastModifiedBy", "jcr:created", "jcr:lastModified", "jcr:createdBy", "jcr:predecessors", "sling:resourceType", "jcr:uuid", "jcr:versionHistory", "jcr:isCheckedOut", "cq:responsive", "cq:lastReplicated", "cq:lastReplicatedBy", "cq:lastReplicationAction", "cq:styleIds", "cq:cloudserviceconfigs", "cq:isCancelledForChildren", ":type", };
    }

}
