package com.waters.aem.core.utils;

import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.constants.WatersConstants;

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

    public static Link getExternalizedLink(final PageManagerDecorator pageManager, final Link link) {
        return Optional.ofNullable(pageManager.getPage(link.getPath()))
               .map(page -> page.getLink(true))
               .orElse(link);
    }

    public static Link getHomepageLink(final PageDecorator page) {
        return page.getAbsoluteParent(WatersConstants.LEVEL_SITE_ROOT).getChildren()
                .stream()
                .filter(WatersConstants.PREDICATE_HOME_PAGE::apply)
                .findFirst()
                .map(homepage -> homepage.getLink(true))
                .orElse(null);
    }

    public static Link getCurrentHomepageLink(final PageDecorator page) {
       return page.getPath().contains("/content/order") ? page.getAbsoluteParent(WatersConstants.ORDER_LANGUAGE_ROOT).getLink(true) : page.getAbsoluteParent(WatersConstants.LEVEL_LANGUAGE_ROOT).getLink(true);
    }

    private LinkUtils() {
        
    }
}
