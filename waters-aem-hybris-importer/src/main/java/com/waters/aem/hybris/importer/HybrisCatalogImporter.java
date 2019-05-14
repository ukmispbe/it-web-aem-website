package com.waters.aem.hybris.importer;

import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

public interface HybrisCatalogImporter {

    /**
     * Import Hybris catalog pages.
     *
     * @param rootCategory root category for catalog
     * @return list of importer results
     */
    List<HybrisImporterResult> importCatalogPages(Category rootCategory);
}