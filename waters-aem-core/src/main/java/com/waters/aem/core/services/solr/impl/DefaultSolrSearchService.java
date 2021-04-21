package com.waters.aem.core.services.solr.impl;

import com.waters.aem.core.services.solr.SolrSearchService;
import com.waters.aem.core.services.solr.SolrSearchServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = SolrSearchService.class)
@Designate(ocd = SolrSearchServiceConfiguration.class)
public final class DefaultSolrSearchService implements SolrSearchService {

    private volatile String baseUrl;
    private volatile String rows;

    @Override
    public String getBaseUrl() {
        return baseUrl;
    }

    @Override
    public String getRows() {
        return rows;
    }

    @Activate
    @Modified
    protected void activate(final SolrSearchServiceConfiguration configuration) {
        baseUrl = configuration.baseUrl();
        rows = configuration.rows();
    }
}

