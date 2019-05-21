package com.waters.aem.hybris.executor.options;

import com.google.common.base.Objects;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingHttpServletRequest;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public final class HybrisImporterOptions {

    private static final String PARAMETER_REPLICATE = "replicate";

    private static final String PARAMETER_PRODUCT_CODE = "productCode";

    /** Default importer options. **/
    public static final HybrisImporterOptions DEFAULT = new HybrisImporterOptions();

    public static HybrisImporterOptions fromRequest(final SlingHttpServletRequest request) {
        final Boolean replicate = Boolean.valueOf(request.getParameter(PARAMETER_REPLICATE));
        final List<String> productCodes = Arrays.asList(
            ArrayUtils.nullToEmpty(request.getParameterValues(PARAMETER_PRODUCT_CODE)));

        return new HybrisImporterOptions().withProductCodes(productCodes).replicate(replicate);
    }

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

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("productCodes", productCodes)
            .add("replicate", replicate)
            .toString();
    }
}
