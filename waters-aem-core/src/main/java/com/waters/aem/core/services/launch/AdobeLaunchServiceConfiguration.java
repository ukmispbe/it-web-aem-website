package com.waters.aem.core.services.launch;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Adobe Launch Service Configuration")
public @interface AdobeLaunchServiceConfiguration {

    @AttributeDefinition(name = "Launch Script", description = "name of the launch script.")
    String launchScript() default "//assets.adobedtm.com/launch-ENcc0eb4fd7a4845a5a300a00e28bee31b-development.min.js";
}
