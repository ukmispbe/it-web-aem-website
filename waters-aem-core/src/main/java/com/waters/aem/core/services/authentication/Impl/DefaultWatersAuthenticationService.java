package com.waters.aem.core.services.authentication.impl;

import com.waters.aem.core.services.authentication.WatersAuthenticationService;
import com.waters.aem.core.services.authentication.WatersAuthenticationServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = WatersAuthenticationService.class)
@Designate(ocd = WatersAuthenticationServiceConfiguration.class)
public class DefaultWatersAuthenticationService implements WatersAuthenticationService {

    private volatile String signInUrl;

    private volatile String signOutUrl;

    private volatile String myAccountUrl;

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

    @Activate
    @Modified
    protected void activate(final WatersAuthenticationServiceConfiguration configuration) {
        signInUrl = configuration.signInUrl();
        signOutUrl = configuration.signOutUrl();
        myAccountUrl = configuration.myAccountUrl();
    }
}