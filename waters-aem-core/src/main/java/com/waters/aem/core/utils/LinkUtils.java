package com.waters.aem.core.utils;

import com.icfolson.aem.library.api.link.Link;


public final class LinkUtils {

    public static Boolean isExternal(Link link) {
        return !link.getHref().startsWith("/");
    }
}
