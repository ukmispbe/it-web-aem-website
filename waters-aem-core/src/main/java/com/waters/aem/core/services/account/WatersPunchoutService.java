package com.waters.aem.core.services.account;

public interface WatersPunchoutService {

    /**
     * Get the configured setup URL.
     *
     * @return Setup URL
     */
    String getSetupUrl();

    /**
     * Get the configured Punchout login URL.
     *
     * @return Punchoutlogin URL
     */
    String getPunchoutLogin();
}