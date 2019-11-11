package com.waters.aem.hybris.constants;

public final class HybrisImporterConstants {

    public static final String NAMESPACE_PREFIX_IMPORTER = "importer";

    public static final String NAMESPACE_PREFIX_HYBRIS = "hybris";

    public static final String NAMESPACE_URI_IMPORTER = "http://www.waters.com/ns/importer/1.0";

    public static final String NAMESPACE_URI_HYBRIS = "http://www.waters.com/ns/hybris/1.0";

    public static final String DATE_FORMAT_PATTERN = "yyyy-MM-dd'T'HH:mm:ssX";

    public static final String PROPERTY_RESULTS = "importer:results";

    public static final String PROPERTY_EXCEPTION_STACK_TRACE = "importer:exceptionStackTrace";

    public static final String PROPERTY_DURATION = "importer:duration";

    public static final String PROPERTY_LAST_IMPORT_DATE = "importer:lastImportDate";

    public static final String PROPERTY_LAST_REQUESTED_PRODUCT_DELTA = "importer:lastRequestedProductDelta";

    public static final String IMPORTER_PAGE_PATH = "/etc/waters/hybris-importer";

    public static final String PROPERTY_REDIRECT_TARGET = "redirectTarget";

    public static final String PROPERTY_REDIRECT_STATUS = "sling:redirectStatus";

    public static final String PROPERTY_SLING_REDIRECT = "sling:redirect";

    public static int REDIRECT_STATUS_VALUE = 302;

    private HybrisImporterConstants() {

    }
}
