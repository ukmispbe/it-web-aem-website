package com.waters.aem.core.form.captcha;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters reCAPTCHA Service Configuration")
public @interface CaptchaServiceConfiguration {

    @AttributeDefinition(name = "JS API", description = "JS API Location")
    String jsApi() default "https://www.recaptcha.net/recaptcha/api.js";

    @AttributeDefinition(name = "Verify API ", description = "Verify API Location")
    String verifyApi() default "https://www.recaptcha.net/recaptcha/api/siteverify";

    @AttributeDefinition(name = "Site key", description = "The reCAPTCHA site key configured in the Google admin " +
            "console.")
    String siteKey() default "6LcKW74UAAAAAAYdx2OsuLc5PWixhH3yca8Wr96X";

    @AttributeDefinition(name = "Site Secret", description = "The reCAPTCHA site key configured in the Google admin " +
            "console.")
    String siteSecret() default "6LcKW74UAAAAAP5Kpxoo03W4bnveKMu35XMUQgrR";
}
