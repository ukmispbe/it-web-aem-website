package com.waters.aem.hybris.executor.options;

import com.google.common.base.Objects;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingHttpServletRequest;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Options builder for Hybris import executions.
 */
public final class HybrisImporterOptions {

    private static final String PARAMETER_FORCE = "force";

    private static final String PARAMETER_REPLICATE = "replicate";

    private static final String PARAMETER_PRODUCT_CODE = "productCodes";

    /** Default importer options. **/
    public static final HybrisImporterOptions DEFAULT = new HybrisImporterOptions();

    public static HybrisImporterOptions fromRequest(final SlingHttpServletRequest request) {
        final Boolean force = Boolean.valueOf(request.getParameter(PARAMETER_FORCE));
        final Boolean replicate = Boolean.valueOf(request.getParameter(PARAMETER_REPLICATE));
        final List<String> productCodes = Optional.ofNullable(request.getParameter(PARAMETER_PRODUCT_CODE))
                .map(codes -> Arrays.stream(ArrayUtils.nullToEmpty(codes.split(",")))
                                .filter(code -> !code.isEmpty())
                                .map(String::trim)
                                .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        return new HybrisImporterOptions()
            .withProductCodes(productCodes)
            .force(force)
            .replicate(replicate);
    }

    private List<String> productCodes = Collections.emptyList();

    private Boolean replicate = true;

    private Boolean force = false;

    public HybrisImporterOptions withProductCodes(final List<String> productCodes) {
        this.productCodes = productCodes;

        return this;
    }

    public HybrisImporterOptions force(final Boolean force) {
        this.force = force;

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

    public Boolean isForce() {
        return force;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("productCodes", productCodes)
            .add("replicate", replicate)
            .add("force", force)
            .toString();
    }
}
