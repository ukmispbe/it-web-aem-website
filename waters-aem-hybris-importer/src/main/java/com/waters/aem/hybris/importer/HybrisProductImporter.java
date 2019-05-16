package com.waters.aem.hybris.importer;

import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

/**
 * Create product nodes from the Hybris product export.
 */
public interface HybrisProductImporter {

    /**
     * Import all products that have been modified since the last import date.
     *
     * @return list of importer results
     */
    List<HybrisImporterResult> importProducts();
}
