package com.waters.aem.core.components.structure.page.processor.step;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.NameConstants;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.servlets.post.Modification;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component(service = ApplicationNotesPostProcessorStep.class)
public final class ApplicationNotesTagsPostProcessorStep implements ApplicationNotesPostProcessorStep {

    private static final String RESOURCE_APPLICATION_NOTES = "applicationnotes";

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationNotesTagsPostProcessorStep.class);

    @Override
    public void process(final ApplicationNotes applicationNotes, final List<Modification> modifications)
        throws PersistenceException {
        final List<String> tagIds = applicationNotes.getAllTags()
            .stream()
            .map(Tag :: getTagID)
            .collect(Collectors.toList());

        processApplicationNotesResource(applicationNotes.getResource(), modifications, tagIds);
    }

    private void processApplicationNotesResource(final Resource resource, final List<Modification> modifications,
        final List<String> tagIds) throws PersistenceException {
        final Resource applicationNotesResource = getApplicationNotesResource(resource, modifications);
        final ValueMap properties = applicationNotesResource.adaptTo(ModifiableValueMap.class);

        if (tagIds.isEmpty()) {
            LOG.debug("removing tags property from application notes resource : {}", resource);

            properties.remove(NameConstants.PN_TAGS);
        } else {
            LOG.debug("merging {} tags to application notes resource : {}", tagIds.size(), resource);

            properties.put(NameConstants.PN_TAGS, tagIds.toArray(new String[0]));
        }

        // add modification to list
        modifications.add(Modification.onModified(applicationNotesResource.getPath()));
    }

    private Resource getApplicationNotesResource(final Resource resource, final List<Modification> modifications)
        throws PersistenceException {
        Resource applicationNotesResource = resource.getChild(RESOURCE_APPLICATION_NOTES);

        if (applicationNotesResource == null) {
            final Map<String, Object> properties = Collections.singletonMap(JcrConstants.JCR_MIXINTYPES,
                TagConstants.NT_TAGGABLE);

            applicationNotesResource = resource.getResourceResolver().create(resource, RESOURCE_APPLICATION_NOTES,
                properties);

            // add modification for resource created
            modifications.add(Modification.onCreated(applicationNotesResource.getPath()));
        }

        return applicationNotesResource;
    }
}
