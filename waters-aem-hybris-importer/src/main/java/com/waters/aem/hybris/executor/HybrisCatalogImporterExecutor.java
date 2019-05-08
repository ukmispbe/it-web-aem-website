package com.waters.aem.hybris.executor;

import com.google.common.util.concurrent.ListenableFuture;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;

public interface HybrisCatalogImporterExecutor {

    ListenableFuture<HybrisImporterExecutionResult> executeCatalogImport();

    Boolean isRunning();
}
