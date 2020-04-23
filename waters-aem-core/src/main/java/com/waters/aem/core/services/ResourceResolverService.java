package com.waters.aem.core.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

public interface ResourceResolverService {

    ResourceResolver getResourceResolver(String subServiceName) throws LoginException;
}
