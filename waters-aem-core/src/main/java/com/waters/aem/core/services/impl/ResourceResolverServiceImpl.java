package com.waters.aem.core.services.impl;

import com.waters.aem.core.services.ResourceResolverService;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import java.util.Collections;

@Component(immediate = true, service = ResourceResolverService.class)
public final class ResourceResolverServiceImpl implements ResourceResolverService {

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    //TODO: Use this resource resolver in whole project
    @Override
    public ResourceResolver getResourceResolver(final String subserviceName) throws LoginException {
        return resourceResolverFactory.getServiceResourceResolver(Collections.singletonMap(
                ResourceResolverFactory.SUBSERVICE, subserviceName));
    }
}