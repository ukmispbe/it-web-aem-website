package com.waters.aem.core.services.brightcove;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Brightcove Service Configuration")
public @interface BrightcoveServiceConfiguration {

    @AttributeDefinition(name = "Account Id", description = "Waters Brightcove account Id")
    String brightcoveAccount() default "1786731335";

    @AttributeDefinition(name = "Player Id", description = "Waters Brightcove player Id")
    String brightcovePlayerId() default "ptF88s0lh8";

    @AttributeDefinition(name = "Account Id", description = "Waters Brightcove account Id")
    String chinaBrightcoveAccount() default "3785504764001";

    @AttributeDefinition(name = " China Player Id", description = "Waters China Brightcove player Id")
    String chinaBrightcovePlayerId() default "LzZZEI5jZ";

}