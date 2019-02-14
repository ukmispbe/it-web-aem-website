package com.waters.aem.pdfgenerator.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "PDF Generator Configuration")
public @interface PdfGeneratorConfiguration {

    @AttributeDefinition(name = "PDF Base URI",
        description = "Base URI for converting HTML to PDF elements.")
    String baseUri() default "https://nextgen.waters.com";

    @AttributeDefinition(name = "Author Username",
        description = "Username for author-based PDF generation requests.")
    String username() default "admin";

    @AttributeDefinition(name = "Author Password",
        description = "Password for author-based PDF generation requests.",
        type = AttributeType.PASSWORD)
    String password();
}