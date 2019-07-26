package com.waters.aem.core.services.authentication;

public interface WatersAuthenticationService {

    /**
     * Get the configured loginURL.
     *
     * @return login URL
     */
    String getSignInUrl();

    /**
     * Get the configured log out URL.
     *
     * @return log out URL
     */
    String getSignOutUrl();

    /**
     * Get the configured my account URL.
     *
     * @return my account URL
     */
    String getMyAccountUrl();
}