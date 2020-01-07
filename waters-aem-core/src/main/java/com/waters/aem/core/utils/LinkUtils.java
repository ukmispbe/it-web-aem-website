package com.waters.aem.core.utils;

import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;

import java.util.Optional;


public final class LinkUtils {

    private static final String WATERS_DOMAIN = "www.waters.com";

    public static Boolean isExternal(Link link) {
        return link != null && !link.getHref().contains(WATERS_DOMAIN) && !link.getHref().startsWith("/");
    }

    public static Boolean isSvg(String icon) {
        return icon != null && icon.endsWith(".svg");
    }

    public static Link getMappedLink(final PageManagerDecorator pageManager, final Link link) {
        return Optional.ofNullable(pageManager.getPage(link.getPath()))
                .map(page -> LinkBuilderFactory.forPage(page, true).build())
                .orElse(link);
    }

    private LinkUtils() {
        
    }
}
