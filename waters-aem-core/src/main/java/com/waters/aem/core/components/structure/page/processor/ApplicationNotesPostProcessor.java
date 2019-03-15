package com.waters.aem.core.components.structure.page.processor;

import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.components.structure.page.processor.step.ApplicationNotesPostProcessorStep;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.servlets.post.Modification;
import org.apache.sling.servlets.post.SlingPostProcessor;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component(service = SlingPostProcessor.class)
public final class ApplicationNotesPostProcessor implements SlingPostProcessor {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationNotesPostProcessor.class);

    private volatile List<ApplicationNotesPostProcessorStep> applicationNotesPostProcessorSteps =
        new CopyOnWriteArrayList<>();

    @Override
    public void process(final SlingHttpServletRequest request, final List<Modification> modifications)
        throws PersistenceException {
        final Resource resource = request.getResourceResolver().getResource(request.getResource().getPath());

        if (resource != null) {
            final ApplicationNotes applicationNotes = resource.adaptTo(ApplicationNotes.class);

            for (final ApplicationNotesPostProcessorStep step : applicationNotesPostProcessorSteps) {
                if (step.accepts(resource)) {
                    LOG.debug("post-processing application notes for resource : {} with step class : {}", resource,
                        step.getClass().getName());

                    step.process(applicationNotes, modifications);
                }
            }
        }
    }

    @Reference(cardinality = ReferenceCardinality.MULTIPLE, policy = ReferencePolicy.DYNAMIC)
    protected void bindApplicationNotesPostProcessorStep(final ApplicationNotesPostProcessorStep step) {
        LOG.debug("adding application notes post processor step : {}", step.getClass().getName());

        applicationNotesPostProcessorSteps.add(step);
    }

    protected void unbindApplicationNotesPostProcessorStep(final ApplicationNotesPostProcessorStep step) {
        LOG.debug("removing application notes post processor step : {}", step.getClass().getName());

        applicationNotesPostProcessorSteps.remove(step);
    }
}
