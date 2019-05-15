package com.waters.aem.hybris.importer;

import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

public interface HybrisCatalogImporter {

    /**
     * Import Hybris catalog pages.
     *
     * @return list of importer results
     */
    List<HybrisImporterResult> importCatalogPages();
}