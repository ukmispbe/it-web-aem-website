package com.waters.aem.core.services.commerce;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Commerce Service Configuration")
public @interface WatersCommerceServiceConfiguration {

    @AttributeDefinition(name = "Sku Availability Endpoint", description = "URL for the Sku Availability endpoint")
    String skuAvailabilityUrl() default "https://dev1-services.waters.com/api/waters/product/v1/availability/{partnumber}/{countryCode}";

    @AttributeDefinition(name = "Customer Price Endpoint", description = "URL for the Sku Customer Price endpoint")
    String skuCustomerPriceUrl() default "https://api-sbox.waters.com/dev-waters-product-exp-api-v1/api/products/prices";

    @AttributeDefinition(name = "Add to Cart Endpoint", description = "URL for the Add to Cart endpoint")
    String addToCartUrl() default "https://api-sbox.waters.com/dev-waters-cart-proxy-api-v1/{localeCountry}/{localeLanguage}/users/{userType}/carts/{guid}/entries";

    @AttributeDefinition(name = "View Cart URL (Ecom)", description = "URL for the View Cart button")
    String ecomViewCartUrl() default "https://dev1.waters.com/store/{localeCountry}/{localeLanguage}/cart";

    @AttributeDefinition(name = "View Cart URL (Eproc)", description = "URL for the View Cart button")
    String eprocViewCartUrl() default "https://dev1-order.waters.com/store/{localeLanguage}/cart";
    
    @AttributeDefinition(name = "Contact Us URL", description = "URL for Contact us page")
    String contactUsLink() default "https://dev1.waters.com/waters/contactUs.htm";
    
}
