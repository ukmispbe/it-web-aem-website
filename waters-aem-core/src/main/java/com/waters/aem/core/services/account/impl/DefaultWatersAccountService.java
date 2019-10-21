package com.waters.aem.core.services.account.impl;

import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.services.account.WatersAccountServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = WatersAccountService.class)
@Designate(ocd = WatersAccountServiceConfiguration.class)
public class DefaultWatersAccountService implements WatersAccountService {

    private volatile String signInUrl;

    private volatile String signOutUrl;

    private volatile String myAccountUrl;

    private volatile String legacySearchUrl;

    private volatile String registrationUrl;

    private volatile String emailValidationUrl;

    @Override
    public String getSignInUrl() {
        return signInUrl;
    }

    @Override
    public String getSignOutUrl() {
        return signOutUrl;
    }

    @Override
    public String getMyAccountUrl() {
        return myAccountUrl;
    }

    @Override
    public String getLegacySearchUrl() {
        return legacySearchUrl;
    }

    @Override
    public String getRegistrationUrl() {
        return registrationUrl;
    }

    @Override
    public String getEmailValidationUrl() {
        return emailValidationUrl;
    }

    @Activate
    @Modified
    protected void activate(final WatersAccountServiceConfiguration configuration) {
        signInUrl = configuration.signInUrl();
        signOutUrl = configuration.signOutUrl();
        myAccountUrl = configuration.myAccountUrl();
        legacySearchUrl = configuration.legacySearchUrl();
        registrationUrl = configuration.registrationUrl();
        emailValidationUrl = configuration.emailValidationUrl();
    }
}