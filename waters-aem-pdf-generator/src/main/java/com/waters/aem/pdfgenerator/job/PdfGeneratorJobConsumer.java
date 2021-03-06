package com.waters.aem.pdfgenerator.job;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.services.job.AbstractJobConsumer;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.SlingException;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 * The PDF Generator Job Consumer is responsible for consuming jobs generated by the PDF Generator Replication Event
 * Handler.
 */
@Component(immediate = true,
    service = JobConsumer.class,
    property = {
        JobConsumer.PROPERTY_TOPICS + "=" + PdfGeneratorJobConsumer.JOB_TOPIC
    })
public final class PdfGeneratorJobConsumer extends AbstractJobConsumer {

    public static final String JOB_TOPIC = "com/waters/events/pdfgenerator/generate";

    private static final Logger LOG = LoggerFactory.getLogger(PdfGeneratorJobConsumer.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private PdfGenerator pdfGenerator;

    @Override
    protected JobResult processJob(final String topic, final String path) {
        LOG.info("processing PDF generator job for path : {}", path);

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageDecorator page = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(path);

            pdfGenerator.generatePdfDocumentAssetFromHtml(page);
        } catch (LoginException | IOException e) {
            LOG.error("error generating PDF for path : " + path, e);

            // re-throw exception to cancel the job
            throw new SlingException(null, e);
        }

        return JobResult.OK;
    }
}
