package com.waters.aem.core.services.brightcove;


public interface BrightcoveService {

    /**
     * Get the configured brightcove account number.
     *
     * @return account id
     */
    String getBrightcoveAccount();

    /**
     * Get the configured brightcove player id.
     *
     * @return player id
     */
    String getBrightcovePlayerId();

    /**
     * Get the configured brightcove account number for China.
     *
     * @return account id
     */
    String getChinaBrightcoveAccount();

    /**
     * Get the configured brightcove player id for China.
     *
     * @return player id
     */
    String getChinaBrightcovePlayerId();
}