package com.waters.aem.core.utils;

import com.day.cq.wcm.api.NameConstants;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;

/**
 * Page and template-related utility functions.
 */
public final class Templates {

    /**
     * Check if the given page is an application notes page.
     *
     * @param page page
     * @return true if page is non-null and is an application notes template
     */
    public static boolean isApplicationNotesPage(final PageDecorator page) {
        return isPage(page, WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE);
    }

    /**
     * Check if the given content resource is an application notes page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is an application notes template
     */
    public static boolean isApplicationNotesPage(final Resource resource) {
        return isPage(resource, WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE);
    }

    /**
     * Check if the given page is a library page.
     *
     * @param page page
     * @return true if page is non-null and is a library template
     */
    public static boolean isLibraryPage(final PageDecorator page) {
        return isPage(page, WatersConstants.TEMPLATE_LIBRARY_PAGE);
    }

    /**
     * Check if the given content resource is a library page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is a library template
     */
    public static boolean isLibraryPage(final Resource resource) {
        return isPage(resource, WatersConstants.TEMPLATE_LIBRARY_PAGE);
    }

    /**
     * Check if the given page is a sku page.
     *
     * @param page page
     * @return true if page is non-null and is a sku template
     */
    public static boolean isSkuPage(final PageDecorator page) {
        return isPage(page, WatersConstants.TEMPLATE_SKU_PAGE);
    }

    /**
     * Check if the given content resource is a sku page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is a sku template
     */
    public static boolean isSkuPage(final Resource resource) {
        return isPage(resource, WatersConstants.TEMPLATE_SKU_PAGE);
    }

    /**
     * Check if the given page is a category page.
     *
     * @param page page
     * @return true if page is non-null and is a catalog template
     */
    public static boolean isCatalogPage(final PageDecorator page) {
        return isPage(page, WatersConstants.TEMPLATE_CATALOG_PAGE);
    }

    /**
     * Check if the given content resource is a category page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is a catalog template
     */
    public static boolean isCatalogPage(final Resource resource) {
        return isPage(resource, WatersConstants.TEMPLATE_CATALOG_PAGE);
    }

    /**
     * Check if the given page is a home page.
     *
     * @param page page
     * @return true if page is non-null and is a home page template
     */
    public static boolean isHomePage(final PageDecorator page) {
        return isPage(page, WatersConstants.TEMPLATE_HOME_PAGE);
    }

    /**
     * Check if the given content resource is a home page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is a home page template
     */
    public static boolean isHomePage(final Resource resource) {
        return isPage(resource, WatersConstants.TEMPLATE_HOME_PAGE);
    }

    /**
     * Check if the given page is a form page.
     *
     * @param page page
     * @return true if page is non-null and is a form template
     */
    public static boolean isFormPage(final PageDecorator page) {
        return isPage(page, WatersConstants.TEMPLATE_FORM_PAGE);
    }

    /**
     * Check if the given content resource is a form page.
     *
     * @param resource page jcr:content resource
     * @return true if resource is non-null and is a form template
     */
    public static boolean isFormPage(final Resource resource) {
        return isPage(resource, WatersConstants.TEMPLATE_FORM_PAGE);
    }

    private static boolean isPage(final PageDecorator page, final String template) {
        return page != null && isPage(page.getContentResource(), template);
    }

    private static boolean isPage(final Resource resource, final String template) {
        return resource != null && template.equals(resource.getValueMap().get(NameConstants.PN_TEMPLATE, ""));
    }

    private Templates() {

    }
}
