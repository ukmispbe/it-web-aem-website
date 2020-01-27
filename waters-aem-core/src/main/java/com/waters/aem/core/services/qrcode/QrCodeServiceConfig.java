package com.waters.aem.core.services.qrcode;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters QR Code Service Configuration")
public @interface QrCodeServiceConfig {

    @AttributeDefinition(name = "Default Language Root Path", description = "Sets the language path for the default " +
        "redirect if no sku page is found.")
    String defaultLanguageRootPath() default "/content/waters/us/en";

    @AttributeDefinition(name = "Global Experience Root Path", description = "The path for the global experience root" +
        ". This path is used if there is no existing country node")
    String globalExperienceRootPath() default "/content/waters/xg/en";

    @AttributeDefinition(name = "Default Redirect Page", description = "Sets the relative page path to redirect to in" +
        " the event that the sku page was not found.")
    String redirectPageRelativePath() default "/shop/shop-all-products";
}
