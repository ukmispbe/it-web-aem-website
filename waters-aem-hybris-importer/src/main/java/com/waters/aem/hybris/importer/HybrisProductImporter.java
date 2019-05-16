package com.waters.aem.hybris.importer;

import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

public interface HybrisProductImporter {

    List<HybrisImporterResult> importProducts();
}
