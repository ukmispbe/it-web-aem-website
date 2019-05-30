package com.waters.aem.hybris.result;

import java.util.List;

public final class HybrisImporterExecutionResult {

    private List<HybrisImporterResult> results;

    private Long duration;

    public HybrisImporterExecutionResult(final List<HybrisImporterResult> results, final Long duration) {
        this.results = results;
        this.duration = duration;
    }

    public List<HybrisImporterResult> getResults() {
        return results;
    }

    public Long getDuration() {
        return duration;
    }
}
