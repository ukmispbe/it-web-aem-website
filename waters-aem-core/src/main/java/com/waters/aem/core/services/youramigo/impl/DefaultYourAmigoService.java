package com.waters.aem.core.services.youramigo.impl;

import com.waters.aem.core.services.youramigo.YourAmigoService;
import com.waters.aem.core.services.youramigo.YourAmigoServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service =YourAmigoService.class)
@Designate(ocd =YourAmigoServiceConfiguration.class)
public final class DefaultYourAmigoService implements YourAmigoService {

    private volatile boolean enabled;

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Activate
    @Modified
    protected void activate(final YourAmigoServiceConfiguration configuration) {
        enabled = configuration.enabled();
    }
}
