package com.waters.aem.core.pdf;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "PDF Generator Service Configuration")
public @interface PdfGeneratorServiceConfiguration {

    @AttributeDefinition(name = "PDF Base URI", description = "Base URI for converting HTML to PDF elements.")
    String baseUri() default "https://test-www.waters.com";
}