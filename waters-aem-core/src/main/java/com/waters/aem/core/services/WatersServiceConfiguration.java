package com.waters.aem.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Service Configuration")
public @interface WatersServiceConfiguration {

    @AttributeDefinition(name = "Search Base URL", description = "Base URL for Waters Search Service.")
    String searchBaseUrl() default "https://dev-www.waters.com:8443/api/waters/search";

    @AttributeDefinition(name = "Sku Availability Endpoint", description = "URL for the Sku Availability endpoint")
    String skuAvailabilityUrl() default "https://dev-www.waters.com:8443/product/v1/availability/{partnumber}/{isocode}";

    @AttributeDefinition(name = "Customer Price Endpoint", description = "URL for the Sku Customer Price endpoint")
    String skuCustomerPriceUrl() default "https://dev-www.waters.com:8443/product/v1/customerprice";

    @AttributeDefinition(name = "Cart Endpoint", description = "URL for the Cart endpoint")
    String cartUrl() default "https://www.waters.com/waters/ajax.htm?handler=shoppingHandler&action=processExternalCart";
}
