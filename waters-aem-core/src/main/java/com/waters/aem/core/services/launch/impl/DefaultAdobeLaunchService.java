package com.waters.aem.core.services.launch.impl;

import com.waters.aem.core.services.launch.AdobeLaunchService;
import com.waters.aem.core.services.launch.AdobeLaunchServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = AdobeLaunchService.class)
@Designate(ocd = AdobeLaunchServiceConfiguration.class)
public final class DefaultAdobeLaunchService implements AdobeLaunchService {

    private volatile String ecommLaunchScript;
    
    private volatile String eprocLaunchScript;

    @Override
    public String getEcommLaunchScript() {
        return ecommLaunchScript;
    }
    
    @Override
    public String getEprocLaunchScript() {
        return eprocLaunchScript;
    }

    @Activate
    @Modified
    protected void activate(final AdobeLaunchServiceConfiguration configuration) {
    	ecommLaunchScript = configuration.ecommLaunchScript();
    	eprocLaunchScript = configuration.eprocLaunchScript();
    }
}
