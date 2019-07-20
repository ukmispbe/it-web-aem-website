package com.waters.aem.core.mocks

import com.day.cq.commons.Externalizer
import org.apache.sling.api.SlingHttpServletRequest
import org.apache.sling.api.resource.ResourceResolver

class MockExternalizer implements Externalizer {

    @Override
    String externalLink(ResourceResolver resourceResolver, String domain, String path) {
        "http://www.waters.com$path"
    }

    @Override
    String externalLink(ResourceResolver resourceResolver, String s, String s1, String s2) {
        throw new UnsupportedOperationException()
    }

    @Override
    String publishLink(ResourceResolver resourceResolver, String s) {
        throw new UnsupportedOperationException()
    }

    @Override
    String publishLink(ResourceResolver resourceResolver, String s, String s1) {
        throw new UnsupportedOperationException()
    }

    @Override
    String authorLink(ResourceResolver resourceResolver, String s) {
        throw new UnsupportedOperationException()
    }

    @Override
    String authorLink(ResourceResolver resourceResolver, String s, String s1) {
        throw new UnsupportedOperationException()
    }

    @Override
    String relativeLink(SlingHttpServletRequest slingHttpServletRequest, String s) {
        throw new UnsupportedOperationException()
    }

    @Override
    String absoluteLink(SlingHttpServletRequest slingHttpServletRequest, String s, String s1) {
        throw new UnsupportedOperationException()
    }

    @Override
    String absoluteLink(ResourceResolver resourceResolver, String s, String s1) {
        throw new UnsupportedOperationException()
    }

    @Override
    String absoluteLink(String s, String s1) {
        throw new UnsupportedOperationException()
    }
}
