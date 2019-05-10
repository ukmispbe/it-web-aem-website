package com.waters.aem.hybris.executor;

import com.google.common.util.concurrent.ListenableFuture;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;

public interface HybrisImporterExecutorService {

    ListenableFuture<HybrisImporterExecutionResult> execute();

    ListenableFuture<HybrisImporterExecutionResult> getResult();

    Boolean isRunning();
}
