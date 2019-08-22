package com.waters.aem.core.services.commerce;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Commerce Service Configuration")
public @interface WatersCommerceServiceConfiguration {

    @AttributeDefinition(name = "Sku Availability Endpoint", description = "URL for the Sku Availability endpoint")
    String skuAvailabilityUrl() default "https://dev-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{countryCode}";

    @AttributeDefinition(name = "Customer Price Endpoint", description = "URL for the Sku Customer Price endpoint")
    String skuCustomerPriceUrl() default "https://dev-www.waters.com:8443/api/waters/product/v1/customerprice/{partnumber}/{countryCode}";

    @AttributeDefinition(name = "Add to Cart Endpoint", description = "URL for the Add to Cart endpoint")
    String addToCartUrl() default "https://wwwdt1.waters.com/waters/ajax.htm?handler=shoppingHandler&action=processExternalCart";

    @AttributeDefinition(name = "View Cart URL", description = "URL for the View Cart button")
    String viewCartUrl() default "https://wwwdt1.waters.com/waters/shoppingCart.htm";
}
