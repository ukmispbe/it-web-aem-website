package com.waters.aem.core.components.structure.page.processor;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.NameConstants;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.servlets.post.Modification;
import org.apache.sling.servlets.post.SlingPostProcessor;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component(service = SlingPostProcessor.class)
public final class ApplicationNotesPostProcessor implements SlingPostProcessor {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationNotesPostProcessor.class);

    private static final String RESOURCE_APPLICATION_NOTES = "applicationnotes";

    @Override
    public void process(final SlingHttpServletRequest request, final List<Modification> modifications)
        throws PersistenceException {
        if (isApplicationNotesPage(request)) {
            final ApplicationNotes applicationNotes = request.getResource().adaptTo(ApplicationNotes.class);

            LOG.debug("post-processing application notes for resource : {}", request.getResource());

            final List<String> tagIds = applicationNotes.getAllTags()
                .stream()
                .map(Tag :: getTagID)
                .collect(Collectors.toList());

            processApplicationNotesResource(request, modifications, tagIds);
        }
    }

    private void processApplicationNotesResource(final SlingHttpServletRequest request,
        final List<Modification> modifications, final List<String> tagIds) throws PersistenceException {
        final Resource applicationNotesResource = getApplicationNotesResource(request, modifications);
        final ValueMap properties = applicationNotesResource.adaptTo(ModifiableValueMap.class);

        if (tagIds.isEmpty()) {
            LOG.debug("removing tags property from application notes resource", tagIds.size());

            properties.remove(NameConstants.PN_TAGS);
        } else {
            LOG.debug("merging {} tags to application notes resource", tagIds.size());

            properties.put(NameConstants.PN_TAGS, tagIds.toArray(new String[0]));
        }

        modifications.add(Modification.onModified(applicationNotesResource.getPath()));
    }

    private Resource getApplicationNotesResource(final SlingHttpServletRequest request,
        final List<Modification> modifications) throws PersistenceException {
        final ResourceResolver resourceResolver = request.getResourceResolver();
        final Resource resource = resourceResolver.getResource(request.getResource().getPath());

        Resource applicationNotesResource = resource.getChild(RESOURCE_APPLICATION_NOTES);

        if (applicationNotesResource == null) {
            final Map<String, Object> properties = Collections.singletonMap(JcrConstants.JCR_MIXINTYPES,
                TagConstants.NT_TAGGABLE);

            applicationNotesResource = resourceResolver.create(resource, RESOURCE_APPLICATION_NOTES, properties);

            // add modification for resource created
            modifications.add(Modification.onCreated(applicationNotesResource.getPath()));
        }

        return applicationNotesResource;
    }

    private boolean isApplicationNotesPage(final SlingHttpServletRequest request) {
        final ValueMap properties = request.getResource().getValueMap();

        return WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(properties.get(NameConstants.PN_TEMPLATE, ""));
    }
}
