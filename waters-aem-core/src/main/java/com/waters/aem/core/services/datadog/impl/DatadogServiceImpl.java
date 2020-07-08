package com.waters.aem.core.services.datadog.impl;

import com.waters.aem.core.services.datadog.DatadogService;
import com.waters.aem.core.services.datadog.DatadogServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;


@Component(service = DatadogService.class)
@Designate(ocd = DatadogServiceConfiguration.class)
public class DatadogServiceImpl implements DatadogService {

    private volatile String clientToken;

    private volatile String applicationId;

    /**
     * Get the configured client token.
     *
     * @return Client Token
     */
    @Override
    public String getClientToken() {
        return clientToken;
    }

    /**
     * Get the configured application id.
     *
     * @return Application Id
     */
    @Override
    public String getApplicationId() {
        return applicationId;
    }

    @Activate
    @Modified
    protected void activate(final DatadogServiceConfiguration configuration) {
        clientToken = configuration.clientToken();
        applicationId = configuration.applicationId();
    }
}
