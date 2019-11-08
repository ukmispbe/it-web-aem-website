package com.waters.aem.core.form.captcha.impl;

import com.waters.aem.core.form.captcha.CaptchaService;
import com.waters.aem.core.form.captcha.CaptchaServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = CaptchaService.class)
@Designate(ocd = CaptchaServiceConfiguration.class)
public class DefaultCaptchaService implements CaptchaService {

    private volatile String siteKey;

    @Override
    public String getSiteKey() {
        return siteKey;
    }

    @Activate
    @Modified
    protected void activate(final CaptchaServiceConfiguration configuration) {
        this.siteKey = configuration.siteKey();
    }
}