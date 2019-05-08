package com.waters.aem.hybris.job;

import org.apache.sling.commons.scheduler.Scheduler;
import org.osgi.service.component.annotations.Component;

@Component(service = Runnable.class, property = {
    Scheduler.PROPERTY_SCHEDULER_EXPRESSION + "=0 0 0 * * ?",
    Scheduler.PROPERTY_SCHEDULER_CONCURRENT + "=false"
})
public final class HybrisImporterScheduledJob implements Runnable {

    @Override
    public void run() {

    }
}
