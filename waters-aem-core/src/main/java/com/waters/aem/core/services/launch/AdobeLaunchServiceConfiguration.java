package com.waters.aem.core.services.launch;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Adobe Launch Service Configuration")
public @interface AdobeLaunchServiceConfiguration {

    @AttributeDefinition(name = "Ecomm Launch Script", description = "name of the ecomm launch script.")
    String ecommLaunchScript() default "//assets.adobedtm.com/launch-ENcc0eb4fd7a4845a5a300a00e28bee31b-development.min.js";
    
    @AttributeDefinition(name = "Eproc Launch Script", description = "name of the eproc launch script.")
    String eprocLaunchScript() default "//assets.adobedtm.com/adc8a44251cc/f0fbb2712ffd/launch-a45731159c42-development.min.js";
}
