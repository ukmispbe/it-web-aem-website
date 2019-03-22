package com.waters.aem.core.library.page;

import com.day.cq.wcm.api.WCMException;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.library.asset.LibraryAsset;
import org.apache.sling.api.resource.PersistenceException;

import java.util.List;

/**
 * Service providing CRUD operations for Library pages.
 */
public interface LibraryPageManager {

    /**
     * Get the master (blueprint) library page corresponding to the given library DAM asset.
     *
     * @param asset library asset with required metadata
     * @return library page or null if page cannot be found for asset
     */
    PageDecorator getLibraryPage(LibraryAsset asset);

    /**
     * Get the library page live copies corresponding to the given library DAM asset.
     *
     * @param asset library asset with required metadata
     * @return list of live copies or empty list if either the blueprint cannot be found or if the blueprint has no live
     * copies
     * @throws WCMException if error occurs checking live relationship
     */
    List<PageDecorator> getLibraryPageLiveCopies(LibraryAsset asset) throws WCMException;

    /**
     * Create or update the library page for the given library DAM asset.
     *
     * @param asset library asset with required metadata
     * @return created/updated library page
     * @throws PersistenceException if error occurs while saving changes
     * @throws WCMException if error occurs creating page
     */
    PageDecorator createOrUpdateLibraryPage(LibraryAsset asset)
        throws PersistenceException, WCMException;
}