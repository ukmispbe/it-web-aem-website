package com.waters.aem.core.constants;

import com.google.common.base.Predicate;
import com.google.common.collect.ImmutableMap;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.commons.lang3.time.FastDateFormat;

import java.util.Map;

@SuppressWarnings("squid:S1195")
public final class WatersConstants {

    public static final String ROOT_PATH = "/content/waters";

    public static final String CONTENT_ROOT_PATH = "/content";

    public static final String AUTHOR = "author";

    public static final String CART_CHECKOUT = "cart-checkout";

    public static final String CUSTOM_ROOT_PATH = "/nextgen";

    public static final String ORDER_ROOT_PATH = "/content/order";

    public static final String ECOMMERCE = "eCommerce";

    public static final String EPROCUREMENT = "eProcurement";

    public static final String ROOT_PATH_LANGUAGE_MASTERS = ROOT_PATH + "/language-masters";

    public static final String ROOT_PATH_GLOBAL_EXPERIENCE = ROOT_PATH + "/xg";

    public static final String COMPONENT_NAME_PAGE = "page";

    public static final String COMPONENT_PATH_STRUCTURE = "/structure";

    public static final String COMPONENT_PATH_APPLICATION_NOTES = "/content/applicationnotes";

    public static final String COMPONENT_PATH_FORMS = "/content/forms";

    public static final String DAM_PATH = "/content/dam/waters";

    public static final String EMAILS_DAM_PATH = DAM_PATH + "/emails";

    public static final String SYSTEM_NOTIFICATION_PATH = "/var/waters/notifications/system-notification";

    public static final String DAM_PATH_APP_NOTES = "/content/dam/waters/en/app-notes/";

    public static final String RESOURCE_TYPE_PAGE = "waters/components/structure/page";

    public static final String TEMPLATE_HOME_PAGE = "/conf/waters/settings/wcm/templates/home-page";

    public static final String TEMPLATE_SHOP_HOME_PAGE = "/conf/waters/settings/wcm/templates/shop-home-page";

    public static final String TEMPLATE_CONTENT_PAGE = "/conf/waters/settings/wcm/templates/content-page";

    public static final String TEMPLATE_APPLICATION_NOTES_PAGE = "/conf/waters/settings/wcm/templates/application-notes-page";

    public static final String TEMPLATE_LIBRARY_PAGE = "/conf/waters/settings/wcm/templates/library-page";

    public static final String TEMPLATE_REDIRECT_PAGE = "/conf/waters/settings/wcm/templates/redirect-page";

    public static final String TEMPLATE_CATALOG_PAGE = "/conf/waters/settings/wcm/templates/catalog-page";

    public static final String TEMPLATE_CATEGORY_PAGE = TEMPLATE_REDIRECT_PAGE;

    public static final String TEMPLATE_SKU_PAGE = "/conf/waters/settings/wcm/templates/sku-page";

    public static final String TEMPLATE_FORM_PAGE = "/conf/waters/settings/wcm/templates/form-page";

    public static final String TEMPLATE_SEARCH_PAGE = "/conf/waters/settings/wcm/templates/search-page";

    public static final Predicate<PageDecorator> PREDICATE_EPROC_HOME_PAGE = page -> TEMPLATE_SHOP_HOME_PAGE.equals(
            page.getTemplatePath());

    public static final Predicate<PageDecorator> PREDICATE_SKU_PAGE = page -> TEMPLATE_SKU_PAGE.equals(
        page.getTemplatePath());

    public static final Predicate<PageDecorator> PREDICATE_HOME_PAGE = page -> TEMPLATE_HOME_PAGE.equals(
            page.getTemplatePath());

    public static final Predicate<PageDecorator> PREDICATE_GLOBAL_EXP_PAGE =
            page -> page.getPath().startsWith(ROOT_PATH_GLOBAL_EXPERIENCE);

    public static final String RENDER_CONDITION_APPLICATION_NOTES_TEMPLATE = "waters/components/renderconditions/applicationnotestemplate";

    public static final String RENDER_CONDITION_COMMERCE_TAB = "waters/components/renderconditions/commercetab";

    public static final String EXTENSION_PDF = "pdf";

    public static final String TAG_LIBRARY = "waters:category/library";

    public static final String TAG_SHOP = "waters:category/shop";

    public static final String PROPERTY_LIBRARY_ASSET_PATH = "libraryAssetPath";

    public static final String PROPERTY_REDIRECT_TARGET = "redirectTarget";

    public static final String DAM_ICON_PATH = "/content/dam/waters/en/brand-assets/icons";

    public static final int LEVEL_SITE_ROOT = 2;

    public static final int LEVEL_LANGUAGE_ROOT = 3;

    public static final FastDateFormat DATE_FORMAT_ISO_8601 = FastDateFormat.getInstance("yyyy-MM-dd");

    public static final String THUMBNAIL_RENDITION_PREFIX = "cq5dam.thumbnail.319";

    public static final String THUMBNAIL_IMAGE = "thumbnailImage";

    public static final String OG_IMAGE = "ogImage";

    public static final String SEARCH_PAGE_PATH = ROOT_PATH_LANGUAGE_MASTERS + "/en/search.html";

    public static final String DEFAULT_ROLLOUT_CONFIG_PATH = "/libs/msm/wcm/rolloutconfigs/default";
    
    public static final int ORDER_LANGUAGE_ROOT = 2;

    public static final String LABELS = "labels";

    public static final String CONFIGS = "configs";

    public static final Map<String,String> CURRENCY_FORMATS = ImmutableMap.<String, String>builder() .put("JPY","#,##0") .put("WON","#,##0") .build();

    public static final String TAG_CONTENT_TYPE_PATH = "/content/cq:tags/waters/contenttype";
    
    public static final String TAG_ROOT_PATH = "/content/cq:tags/waters";
    
    private WatersConstants() {

    }
}
