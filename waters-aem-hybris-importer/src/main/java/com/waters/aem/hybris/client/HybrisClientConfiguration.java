package com.waters.aem.hybris.client;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Hybris Client Configuration")
public @interface HybrisClientConfiguration {

    @AttributeDefinition(name = "Hostname")
    String hostname() default "backoffice-hybrisdev.waters.com";

    @AttributeDefinition(name = "Catalog ID")
    String catalogId() default "watersProductCatalog";

    @AttributeDefinition(name = "Catalog Version ID")
    String catalogVersionId() default "Online";

    @AttributeDefinition(name = "Web Root Category ID")
    String webRootCategoryId() default "Web";

    @AttributeDefinition(name = "Product List Page Size")
    int pageSize() default 50;
}
