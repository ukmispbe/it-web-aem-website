package com.waters.aem.core.services.youramigo;

/**
 * Service exposing Your Amigo configuration values.
 */
public interface YourAmigoService {

    /**
     * Get the configured Your Amigo.
     *
     * @return true if enabled
     */
    boolean isEnabled();
}
