package com.waters.aem.hybris.executor.options;

import java.util.Collections;
import java.util.List;

public final class HybrisImporterOptions {

    /** Default importer options. **/
    public static final HybrisImporterOptions DEFAULT = new HybrisImporterOptions();

    private List<String> productCodes = Collections.emptyList();

    private Boolean replicate = true;

    public HybrisImporterOptions withProductCodes(final List<String> productCodes) {
        this.productCodes = productCodes;

        return this;
    }

    public HybrisImporterOptions replicate(final Boolean replicate) {
        this.replicate = replicate;

        return this;
    }

    public List<String> getProductCodes() {
        return productCodes;
    }

    public Boolean isReplicate() {
        return replicate;
    }
}
