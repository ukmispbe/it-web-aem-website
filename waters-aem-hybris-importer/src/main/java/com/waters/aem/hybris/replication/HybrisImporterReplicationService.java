package com.waters.aem.hybris.replication;

import com.waters.aem.hybris.result.HybrisImporterResult;

import java.util.List;

/**
 * Replication service for imported resources.
 */
public interface HybrisImporterReplicationService {

    /**
     * Send replication requests for the given list of results.
     *
     * @param results importer results
     */
    void replicate(List<HybrisImporterResult> results);
}
