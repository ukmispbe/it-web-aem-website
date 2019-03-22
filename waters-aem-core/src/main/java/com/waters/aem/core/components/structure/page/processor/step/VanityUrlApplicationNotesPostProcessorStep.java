package com.waters.aem.core.components.structure.page.processor.step;

import com.day.cq.wcm.api.NameConstants;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.servlets.post.Modification;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Component(service = ApplicationNotesPostProcessorStep.class)
public final class VanityUrlApplicationNotesPostProcessorStep implements ApplicationNotesPostProcessorStep {

    private static final Logger LOG = LoggerFactory.getLogger(VanityUrlApplicationNotesPostProcessorStep.class);

    @Override
    public void process(final ApplicationNotes applicationNotes, final List<Modification> modifications) {
        final String literatureCode = applicationNotes.getLiteratureCode();

        if (literatureCode == null) {
            LOG.debug("literature code is null for resource : {}, vanity URL not updated",
                applicationNotes.getResource().getPath());
        } else {
            final ValueMap properties = applicationNotes.getResource().adaptTo(ModifiableValueMap.class);

            properties.put(NameConstants.PN_SLING_VANITY_PATH, "/" + literatureCode);

            modifications.add(Modification.onModified(applicationNotes.getResource().getPath()));
        }
    }

    @Override
    public boolean accepts(final Resource resource) {
        return Templates.isApplicationNotesPage(resource) || Templates.isLibraryPage(resource);
    }
}
