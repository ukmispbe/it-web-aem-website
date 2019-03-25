package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.library.asset.LibraryAsset;
import com.waters.aem.core.metadata.ContentClassification;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ResourcePath;

import java.util.List;

@Model(adaptables = Resource.class)
public final class LibraryPage implements ContentClassification {

    @ResourcePath(name = WatersConstants.PROPERTY_LIBRARY_ASSET_PATH)
    private LibraryAsset libraryAsset;

    @Override
    public String getLiteratureCode() {
        return libraryAsset.getLiteratureCode();
    }

    @Override
    public List<Tag> getCategory() {
        return libraryAsset.getCategory();
    }

    @Override
    public List<Tag> getContentType() {
        return libraryAsset.getContentType();
    }

    @Override
    public List<Tag> getMonthPublished() {
        return libraryAsset.getMonthPublished();
    }

    @Override
    public List<Tag> getYearPublished() {
        return libraryAsset.getYearPublished();
    }

    @Override
    public List<Tag> getAllTags() {
        return libraryAsset.getAllTags();
    }
}
