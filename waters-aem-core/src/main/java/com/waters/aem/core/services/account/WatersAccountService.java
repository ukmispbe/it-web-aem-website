package com.waters.aem.core.services.account;

public interface WatersAccountService {

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

    /**
     * Get the configured endpoint for sign in API.
     *
     * @return User sign in API URL
     */
    String getSignInEndpoint();

    /**
     * Get the configured endpoint for sign out API.
     *
     * @return User sign out API URL
     */
    String getSignOutEndpoint();

    /**
     * Get the configured endpoint for Change account API.
     *
     * @return switch account API URL
     */
    String getChooseAccountEndpoint();

    /**
     * Get the configured endpoint for orderDetailsUrl API.
     *
     * @return Details API URL
     */
    String getOrderDetailsUrl();

    /**
     * Get the configured endpoint for orderListUrl API.
     *
     * @return orderList API URL
     */
    String getOrderListUrl();

    /**
      * Get the configured endpoint for contactSupportUrl API.
      *
      * @return contactSupport API URL
      */
      String getContactSupportUrl();

    /**
      * Get the configured endpoint for quoteHistoryUrl API.
      *
      * @return quoteHistoryUrl API URL
      */
      String getQuoteHistoryUrl(); 
      
      /**
      * Get the configured endpoint for countryList API.
      *
      * @return countryListUrl API URL
      */
      String getCountryListUrl();
            
      /**
      * Get the configured endpoint for countryStatesUrl API.
      *
      * @return country states API URL
      */
      String getCountryStatesUrl();

      /**
      * Get the configured endpoint for supportRequestUrl API.
      *
      * @return support request API URL
      */
      String getSupportRequestUrl();

      /**
      * Get the configured endpoint for supportRequestEquipmentUrl API.
      *
      * @return support request equipment API URL
      */
      String getSupportRequestEquipmentUrl();
      
      /**
       * Get the configured URL for the Thales Software Download URL
       *
       * @return Thales Software Download URL
       */
      String getSoftwareDownloadUrl();
}
