import com.waters.aem.hybris.executor.HybrisImporterExecutorService

def es = getService(HybrisImporterExecutorService)

es.result.cancel(true)
