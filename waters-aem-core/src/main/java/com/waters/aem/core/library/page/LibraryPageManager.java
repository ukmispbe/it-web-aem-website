package com.waters.aem.core.library.page;

import com.day.cq.replication.ReplicationException;
import com.day.cq.wcm.api.WCMException;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.library.asset.LibraryAsset;
import org.apache.sling.api.resource.PersistenceException;

import java.util.List;

/**
 * Service providing CRUD operations for Library pages.
 */
public interface LibraryPageManager {

    PageDecorator getLibraryPage(LibraryAsset asset);

    List<PageDecorator> getLibraryPageLiveCopies(LibraryAsset asset) throws WCMException;

    PageDecorator createOrUpdateLibraryPage(LibraryAsset asset)
        throws PersistenceException, ReplicationException, WCMException;

    void deleteLibraryPage(LibraryAsset asset) throws WCMException;
}