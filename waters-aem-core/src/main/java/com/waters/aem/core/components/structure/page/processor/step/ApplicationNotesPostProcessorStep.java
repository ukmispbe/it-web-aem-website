package com.waters.aem.core.components.structure.page.processor.step;

import com.waters.aem.core.components.structure.page.ApplicationNotes;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.servlets.post.Modification;

import java.util.List;

/**
 * A processing step that is responsible for updating the application notes resource after the page is modified.
 */
public interface ApplicationNotesPostProcessorStep {

    /**
     * Process the application notes resource with the given list of modifications.
     *
     * @param applicationNotes application notes model
     * @param modifications list of modifications for this processing unit
     * @throws PersistenceException if error occurs when modifying application notes resource
     */
    void process(ApplicationNotes applicationNotes, List<Modification> modifications) throws PersistenceException;

    /**
     * Determine if this processor step accepts the given resource.
     *
     * @param resource page content resource
     * @return true if this resource can be processed
     */
    boolean accepts(Resource resource);
}
