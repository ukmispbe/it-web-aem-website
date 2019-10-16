package com.waters.aem.core.services.brightcove;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Brightcove Service Configuration")
public @interface BrightcoveServiceConfiguration {

    @AttributeDefinition(name = "Corporate Account ID", description = "Waters Brightcove Account ID")
    String brightcoveAccount() default "1786731335";

    @AttributeDefinition(name = "Corporate Player ID", description = "Waters Brightcove Player ID")
    String brightcovePlayerId() default "ptF88s0lh8";

    @AttributeDefinition(name = "China Account ID",
            description = "Waters Brightcove Account ID used for China pages only")
    String chinaBrightcoveAccount() default "3785504764001";

    @AttributeDefinition(name = "China Player ID",
            description = "Waters Brightcove Player ID used for China pages only")
    String chinaBrightcovePlayerId() default "LzZZEI5jZ";

}