package com.waters.aem.core.form.captcha;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters reCAPTCHA Service Configuration")
public @interface CaptchaServiceConfiguration {

    @AttributeDefinition(name = "Site key", description = "The reCAPTCHA site key configured in the Google admin " +
            "console.")
    String siteKey() default "6LcoFcIUAAAAAOCX3YwL8pszgVlPxsVB1ModhxRQ";
}
