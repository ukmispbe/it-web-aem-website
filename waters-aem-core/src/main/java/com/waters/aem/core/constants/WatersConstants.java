package com.waters.aem.core.constants;

import org.apache.commons.lang3.time.FastDateFormat;

@SuppressWarnings("squid:S1195")
public final class WatersConstants {

    public static final String ROOT_PATH = "/content/waters";

    public static final String ROOT_PATH_LANGUAGE_MASTERS = ROOT_PATH + "/language-masters";

    public static final String COMPONENT_NAME_PAGE = "page";

    public static final String COMPONENT_PATH_STRUCTURE = "/structure";

    public static final String COMPONENT_PATH_APPLICATION_NOTES = "/content/applicationnotes";

    public static final String DAM_PATH = "/content/dam/waters";

    public static final String DAM_PATH_APP_NOTES = "/content/dam/waters/app-notes/";

    public static final String RESOURCE_TYPE_PAGE = "waters/components/structure/page";

    public static final String TEMPLATE_CONTENT_PAGE = "/conf/waters/settings/wcm/templates/content-page";

    public static final String TEMPLATE_APPLICATION_NOTES_PAGE = "/conf/waters/settings/wcm/templates/application-notes-page";

    public static final String TEMPLATE_LIBRARY_PAGE = "/conf/waters/settings/wcm/templates/library-page";

    public static final String TEMPLATE_REDIRECT_PAGE = "/conf/waters/settings/wcm/templates/redirect-page";

    public static final String TEMPLATE_CATEGORY_PAGE = "/conf/waters/settings/wcm/templates/section-page";

    public static final String TEMPLATE_SKU_PAGE = "/conf/waters/settings/wcm/templates/product-page";

    public static final String RENDER_CONDITION_APPLICATION_NOTES_TEMPLATE = "waters/components/renderconditions/applicationnotestemplate";

    public static final String EXTENSION_PDF = "pdf";

    public static final String TAG_LIBRARY = "waters:category/library";

    public static final String PROPERTY_LIBRARY_ASSET_PATH = "libraryAssetPath";

    public static final String PROPERTY_REDIRECT_TARGET = "redirectTarget";

    public static final String DAM_ICON_PATH = "/content/dam/waters/brand-assets/icons";

    public static final String DAM_ICON_PATH = "/content/dam/waters/brand-assets/icons";

    public static final int LEVEL_SITE_ROOT = 2;

    public static final int LEVEL_LANGUAGE_ROOT = 3;

    public static final FastDateFormat DATE_FORMAT_ISO_8601 = FastDateFormat.getInstance("yyyy-MM-dd");

    private WatersConstants() {

    }
}
