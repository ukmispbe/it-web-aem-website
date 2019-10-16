package com.waters.aem.core.utils;

import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.services.brightcove.BrightcoveService;

public class BrightcoveUtils {

    public static String getBrightcoveAccount(final SiteContext siteContext, final BrightcoveService
        brightcoveService) {
        final String countryCode = siteContext.getLocaleWithCountry().getCountry();
        return countryCode.equalsIgnoreCase("cn") ? brightcoveService.getChinaBrightcoveAccount() :
            brightcoveService.getBrightcoveAccount();
    }

    public static String getBrightcovePlayerId(final SiteContext siteContext, final BrightcoveService
        brightcoveService) {
        final String countryCode = siteContext.getLocaleWithCountry().getCountry();
        return  countryCode.equalsIgnoreCase("cn") ? brightcoveService.getChinaBrightcovePlayerId() :
            brightcoveService.getBrightcovePlayerId();
    }

    private BrightcoveUtils() {

    }
}
