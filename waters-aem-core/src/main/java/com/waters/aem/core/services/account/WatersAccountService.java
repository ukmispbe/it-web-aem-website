package com.waters.aem.core.services.account;

public interface WatersAccountService {

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

    /**
     * Get the configured search page URL.
     *
     * @return my account URL
     */
    String getLegacySearchUrl();

    /**
     * Get the configured registration form URL.
     *
     * @return my account URL
     */
    String getRegistrationSubmitUrl();

    /**
     * Get the configured email validation URL.
     *
     * @return my account URL
     */
    String getEmailValidationUrl();
}
