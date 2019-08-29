package com.waters.aem.hybris.importer;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Hybris Catalog Importer Configuration")
public @interface HybrisCatalogImporterConfiguration {

    @AttributeDefinition(name = "Catalog Blueprint Root Path")
    String catalogRootPath() default "/content/waters/language-masters/en/shop";
}
