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
     * @param force replicate results, ignoring any configured replication limit
     */
    void replicate(List<HybrisImporterResult> results, boolean force);

    /**
     * A flag determining if results should only be replicated if the result count is below the limit.
     *
     * @return true if results replication is limited
     */
    boolean isLimit();

    /**
     * If a limit is enabled and number of results exceed this threshold, results are not replicated by the service.
     *
     * @return limit threshold count
     */
    int getLimitThreshold();
}
