package com.waters.aem.hybris.importer;

import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

public interface HybrisClassificationImporter {

    List<HybrisImporterResult> importClassificationTags(Product product);
}
