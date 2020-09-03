package com.waters.aem.core.services.launch;

/**
 * Service exposing Adobe Launch configuration values.
 */
public interface AdobeLaunchService {

    /**
     * Get the configured Launch Service.
     *
     * @return launch script
     */
    String getEcommLaunchScript();
    
    /**
     * Get the configured Launch Service.
     *
     * @return launch script
     */
    String getEprocLaunchScript();
}
