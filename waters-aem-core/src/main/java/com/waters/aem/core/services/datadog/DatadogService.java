package com.waters.aem.core.services.datadog;

public interface DatadogService {

    /**
     * Get the configured client token.
     *
     * @return Client Token
     */
    String getClientToken();

    /**
     * Get the configured application id.
     *
     * @return Application Id
     */
    String getApplicationId();

}
