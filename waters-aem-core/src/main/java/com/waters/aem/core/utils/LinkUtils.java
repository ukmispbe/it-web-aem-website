package com.waters.aem.core.utils;

import com.icfolson.aem.library.api.link.Link;


public final class LinkUtils {

    private static final String WATERS_DOMAIN = "www.waters.com";

    public static Boolean isExternal(Link link) {
        return link != null && !link.getHref().contains(WATERS_DOMAIN) && !link.getHref().startsWith("/");
    }

    public static Boolean isSvg(String icon) {
        return icon != null && icon.endsWith(".svg");
    }

    private LinkUtils() {
        
    }
}
