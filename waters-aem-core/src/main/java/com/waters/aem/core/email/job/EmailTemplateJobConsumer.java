package com.waters.aem.core.email.job;

import com.day.cq.contentsync.handler.util.RequestResponseFactory;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.google.common.net.HttpHeaders;
import com.waters.aem.core.services.job.AbstractJobConsumer;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingException;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.engine.SlingRequestProcessor;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Job consumer responsible for creating/updating Library pages when Library assets are activated.
 */
@Component(immediate = true,
    service = JobConsumer.class,
    property = {
        JobConsumer.PROPERTY_TOPICS + "=" + EmailTemplateJobConsumer.JOB_TOPIC
    })
public final class EmailTemplateJobConsumer extends AbstractJobConsumer {

    public static final String JOB_TOPIC = "com/waters/events/email/template/create";

    private static final Logger LOG = LoggerFactory.getLogger(EmailTemplateJobConsumer.class);

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private SlingRequestProcessor requestProcessor;

    @Reference
    private RequestResponseFactory requestResponseFactory;

    @Override
    protected JobResult processJob(final String topic, final String path) {
        LOG.info("processing library page job for path : {}", path);

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {

            if (path.startsWith("/content/waters")) {
                handlePage(path, resourceResolver);
            } else {
                handleAsset(path, resourceResolver);
            }

        } catch (LoginException | IOException | ServletException e) {
            LOG.error("error creating/updating library page for path : " + path, e);

            // re-throw exception to cancel the job
            throw new SlingException(null, e);
        }

        return JobResult.OK;
    }

    private void handleAsset(final String path, final ResourceResolver resourceResolver) throws IOException {
        final Asset asset = resourceResolver.getResource(path).adaptTo(Asset.class);

        final String language = Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_LANGUAGE))
                .orElse(getLanguage(asset.getPath()));

        final String templateName = Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_TITLE))
                .orElse(StringUtils.substringBeforeLast(asset.getName(), "."))
                .concat("-" + language);

        LOG.info("Template name = {}, language = {}", templateName, language);

        sendPost(templateName, asset);
    }

    private void handlePage(final String path, final ResourceResolver resourceResolver) throws IOException, ServletException {
        HttpServletRequest request = requestResponseFactory.createRequest("GET", path + ".html",
                new ImmutableMap.Builder<String, Object>()
                        .put("wcmmode", "disabled")
                        .build());
        request.setAttribute("wcmmode", "disabled");

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        HttpServletResponse response = requestResponseFactory.createResponse(out);

        requestProcessor.processRequest(request, response, resourceResolver);

        sendPost("AEMEmailTemplate", "Email page subject",
                new String(out.toByteArray(), StandardCharsets.UTF_8));
    }

    private String getLanguage(final String path) {
        final String regex = "/content/dam/waters/(.+)/emails.*";
        String language = "";

        // Create a Pattern object
        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(path);

        if (matcher.find()) {
            language = matcher.group(1);
        }

        return language;
    }

    private void sendPost(final String templateName, final Asset asset) {
        final String subject = asset.adaptTo(Resource.class).getValueMap()
                .get("jcr:content/emailSubject", "<No subject>");

        final String emailHtml = inputStreamToString(asset.getRendition("original").getStream());

        sendPost(templateName, subject, emailHtml);
    }

    private void sendPost(final String templateName, final String subject, final String html) {
        final CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setConnectionManager(new PoolingHttpClientConnectionManager())
                .build();

        final ImmutableMap<String, String> template = new ImmutableMap.Builder<String, String>()
                .put("TemplateName", templateName)
                .put("SubjectPart", subject)
                .put("HtmlPart", html)
                .build();

        final ImmutableMap<String, Object> templateObject =
                new ImmutableMap.Builder<String, Object>()
                        .put("Template", template)
                        .build();

        try {
            final HttpUriRequest request = RequestBuilder.post("https://ngj6svlc7a.execute-api.us-east-1.amazonaws" +
                    ".com/Prod/settemplate")
                    .addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType())
                    .addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType())
                    .setEntity(new StringEntity(MAPPER.writeValueAsString(templateObject)))
                    .build();

            HttpResponse response = httpClient.execute(request);
            final String responseBody = EntityUtils.toString(response.getEntity());

            LOG.info(responseBody);
        } catch (IOException e) {
            LOG.error("AWS error!", e);
        }
    }

    private String inputStreamToString(final InputStream inputStream) {
        try (BufferedInputStream bis = new BufferedInputStream(inputStream)) {
            ByteArrayOutputStream buf = new ByteArrayOutputStream();
            int result = bis.read();
            while(result != -1) {
                buf.write((byte) result);
                result = bis.read();
            }
            return buf.toString(StandardCharsets.UTF_8.name());
        } catch (IOException e) {
            LOG.error("error converting input stream to string", e);
            return "";
        }
    }
}
