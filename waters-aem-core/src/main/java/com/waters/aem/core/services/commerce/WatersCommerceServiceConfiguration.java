package com.waters.aem.core.services.commerce;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Commerce Service Configuration")
public @interface WatersCommerceServiceConfiguration {

    @AttributeDefinition(name = "Sku Availability Endpoint", description = "URL for the Sku Availability endpoint")
    String skuAvailabilityUrl() default "https://test2-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{countryCode}";

    @AttributeDefinition(name = "Customer Price Endpoint", description = "URL for the Sku Customer Price endpoint")
    String skuCustomerPriceUrl() default "https://api-sbox.waters.com/dev-waters-product-exp-api-v1/api/products/prices";

    @AttributeDefinition(name = "Add to Cart Endpoint", description = "URL for the Add to Cart endpoint")
    String addToCartUrl() default "https://test2-www.waters.com:8443/api/waters/product/v1/addtocart/{partnumber}/{quantity}";

    @AttributeDefinition(name = "View Cart URL", description = "URL for the View Cart button")
    String viewCartUrl() default "https://wwwdt1.waters.com/waters/shoppingCart.htm";
}
