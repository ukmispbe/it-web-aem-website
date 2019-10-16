package com.waters.aem.core.services.brightcove.impl;

import com.waters.aem.core.services.brightcove.BrightcoveService;
import com.waters.aem.core.services.brightcove.BrightcoveServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = BrightcoveService.class)
@Designate(ocd = BrightcoveServiceConfiguration.class)
public class DefaultBrightcoveService implements BrightcoveService {

    private volatile String brightcoveAccount;

    private volatile String brightcovePlayerId;

    private volatile String chinaBrightcoveAccount;

    private volatile String chinaBrightcovePlayerId;

    @Override
    public String getBrightcoveAccount() {
        return brightcoveAccount;
    }

    @Override
    public String getBrightcovePlayerId() {
        return brightcovePlayerId;
    }

    @Override
    public String getChinaBrightcoveAccount() {
        return chinaBrightcoveAccount;
    }

    @Override
    public String getChinaBrightcovePlayerId() {
        return chinaBrightcovePlayerId;
    }

    @Activate
    @Modified
    protected void activate(final BrightcoveServiceConfiguration configuration) {
        brightcoveAccount = configuration.brightcoveAccount();
        brightcovePlayerId = configuration.brightcovePlayerId();
        chinaBrightcoveAccount = configuration.chinaBrightcoveAccount();
        chinaBrightcovePlayerId = configuration.chinaBrightcovePlayerId();
    }
}