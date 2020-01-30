package com.waters.aem.core.email.job;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.email.client.EmailTemplateClient;
import com.waters.aem.core.email.template.SESEmailTemplate;
import com.waters.aem.core.services.job.AbstractJobConsumer;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingException;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
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

    private static final Logger LOG = LoggerFactory.getLogger(EmailTemplateJobConsumer.class);

    public static final String JOB_TOPIC = "com/waters/events/email/template/set";

    public static final String CONTENT_PATH_EMAIL_SUBJECT = "jcr:content/emailSubject";

    public static final String DEFAULT_EMAIL_SUBJECT = "<No subject>";

    public static final String DAM_PATH_EMAIL_REGEX = WatersConstants.DAM_PATH + "/(.+)/emails.*";

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private EmailTemplateClient emailTemplateClient;

    @Override
    protected JobResult processJob(final String topic, final String path) {
        LOG.info("processing email template job for path : {}", path);

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            if (path.startsWith(WatersConstants.DAM_PATH)) {
                handleAsset(path, resourceResolver);
            }
        } catch (LoginException | IOException | URISyntaxException e) {
            LOG.error("error uploading email template to email service : " + path, e);

            // re-throw exception to cancel the job
            throw new SlingException(null, e);
        }

        return JobResult.OK;
    }

    private void handleAsset(final String path, final ResourceResolver resourceResolver) throws IOException,
            URISyntaxException {
        final Asset asset = resourceResolver.getResource(path).adaptTo(Asset.class);

        final String language = Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_LANGUAGE))
                .orElse(getLanguage(asset.getPath()));

        final String templateName = Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_TITLE))
                .orElse(StringUtils.substringBeforeLast(asset.getName(), "."))
                .concat("-" + language);

        LOG.info("uploading template to email service. template name = {}, language = {}", templateName, language);

        setTemplate(templateName, asset);
    }

    private String getLanguage(final String path) {
        String language = "";

        // Create a Pattern object
        Pattern pattern = Pattern.compile(DAM_PATH_EMAIL_REGEX);

        Matcher matcher = pattern.matcher(path);

        if (matcher.find()) {
            language = matcher.group(1);
        }

        return language;
    }

    private void setTemplate(final String templateName, final Asset asset) throws IOException, URISyntaxException {
        final String subject = asset.adaptTo(Resource.class).getValueMap()
                .get(CONTENT_PATH_EMAIL_SUBJECT, DEFAULT_EMAIL_SUBJECT);

        final String emailHtml = inputStreamToString(asset.getRendition(DamConstants.ORIGINAL_FILE).getStream());

        emailTemplateClient.setTemplate(SESEmailTemplate.forHtmlPart(templateName, subject, emailHtml));
    }

    private String inputStreamToString(final InputStream inputStream) throws IOException {
        try (BufferedInputStream bis = new BufferedInputStream(inputStream)) {
            ByteArrayOutputStream buf = new ByteArrayOutputStream();
            int result = bis.read();
            while (result != -1) {
                buf.write((byte) result);
                result = bis.read();
            }
            return buf.toString(StandardCharsets.UTF_8.name());
        }
    }
}
