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

    /**
     * Get the configured password reset URL.
     *
     * @return my account URL
     */
    String getPasswordResetUrl();

    /**
     * Get the configured URL for change password.
     *
     * @return my account URL
     */
    String getChangePasswordUrl();

    /**
     * Get the configured URL for the User Details API.
     *
     * @return User Details API URL
     */
    String getUserDetailsUrl();

    /**
     * Get the configured URL for the Sold To Details API.
     *
     * @return Sold To Details API URL
     */
    String getSoldToDetailsUrl();

    /**
     * Get the configured URL for update password API.
     *
     * @return User update password API URL
     */
    String getUpdatePasswordUrl();

    /**
     * Get the configured URL for update profile API.
     *
     * @return User update profile API URL
     */
    String getUpdateProfileUrl();
}
