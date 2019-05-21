package com.waters.aem.hybris.executor;

import com.google.common.util.concurrent.ListenableFuture;
import com.waters.aem.hybris.executor.options.HybrisImporterOptions;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;

/**
 * Executor service for the Hybris importer process.
 */
public interface HybrisImporterExecutorService {

    /**
     * Execute a Hybris import.
     *
     * @param options importer options
     * @return future containing the result of the asynchronous import process
     */
    ListenableFuture<HybrisImporterExecutionResult> execute(HybrisImporterOptions options);

    /**
     * Get the result of the last Hybris import.
     *
     * @return future containing the result of the asynchronous import process
     */
    ListenableFuture<HybrisImporterExecutionResult> getResult();

    /**
     * Determine if an import process is running.
     *
     * @return true if running
     */
    Boolean isRunning();
}
