package com.waters.aem.core.form.captcha;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Captcha {

    @OSGiService
    private CaptchaService captchaService;

    public String getSiteKey() {
        return captchaService.getSiteKey();
    }

    public String getJsApi() {
        return captchaService.getJsApi();
    }

}
