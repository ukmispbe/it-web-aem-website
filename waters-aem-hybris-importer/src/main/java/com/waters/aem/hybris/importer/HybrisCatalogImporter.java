package com.waters.aem.hybris.importer;

import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

/**
 * Create category/sku pages from the Hybris catalog export.
 */
public interface HybrisCatalogImporter {

    /**
     * Import category/sku pages.
     *
     * @return list of importer results
     */
    List<HybrisImporterResult> importCatalogPages();
}