package com.waters.aem.hybris.job;

import com.waters.aem.hybris.executor.HybrisImporterExecutorService;
import com.waters.aem.hybris.executor.options.HybrisImporterOptions;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = Runnable.class)
@Designate(ocd = HybrisImporterScheduledJobConfiguration.class, factory = true)
public final class HybrisImporterScheduledJob implements Runnable {

    private static final Logger LOG = LoggerFactory.getLogger(HybrisImporterScheduledJob.class);

    @Reference
    private HybrisImporterExecutorService executorService;

    private volatile boolean enabled;

    @Override
    public void run() {
        if (enabled) {
            LOG.info("running hybris importer job...");

            executorService.execute(HybrisImporterOptions.DEFAULT);
        } else {
            LOG.info("hybris importer job is disabled");
        }
    }

    @Activate
    @Modified
    protected void activate(final HybrisImporterScheduledJobConfiguration configuration) {
        enabled = configuration.enabled();
    }
}
