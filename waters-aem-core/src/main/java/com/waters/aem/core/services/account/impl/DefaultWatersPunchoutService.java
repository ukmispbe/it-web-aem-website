package com.waters.aem.core.services.account.impl;

import com.waters.aem.core.services.account.WatersPunchoutService;
import com.waters.aem.core.services.account.WatersPunchoutServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = WatersPunchoutService.class)
@Designate(ocd = WatersPunchoutServiceConfiguration.class)
public class DefaultWatersPunchoutService implements WatersPunchoutService {

    private volatile String setupUrl;

    private volatile String puchOutSignInUrl;

    @Override
    public String getSetupUrl() {
        return setupUrl;
    }

    @Override
    public String getPunchoutLogin() {
        return puchOutSignInUrl;
    }

    @Activate
    @Modified
    protected void activate(final WatersPunchoutServiceConfiguration configuration) {
        setupUrl = configuration.setupUrl();
        puchOutSignInUrl = configuration.puchOutSignInUrl();
    }
}