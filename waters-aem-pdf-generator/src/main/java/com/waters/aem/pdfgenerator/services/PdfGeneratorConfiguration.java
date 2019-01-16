package com.waters.aem.pdfgenerator.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "PDF Generator Configuration")
public @interface PdfGeneratorConfiguration {

    @AttributeDefinition(name = "PDF Base URI", description = "Base URI for converting HTML to PDF elements.")
    String baseUri() default "https://test-www.waters.com";
}