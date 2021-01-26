package com.waters.aem.solr.servlets;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service= SolrFullIndexConfigurationImpl.class,immediate=true)
@Designate(ocd = SolrFullIndexConfiguration.class)
public class SolrFullIndexConfigurationImpl {
	
	private String numShards;
	private String replicationFactor;
	
	@Activate @Modified
	protected void activate(final SolrFullIndexConfiguration solrFullIndexConfiguration) {
		numShards = solrFullIndexConfiguration.getNumShards();
		replicationFactor = solrFullIndexConfiguration.getReplicationFactor();
	}

	/**
	 * @return the number of shards
	 */
	public String getNumShards() {
		return numShards;
	}

	/**
	 * @return the replication factor
	 */
	public String getReplicationFactor() {
		return replicationFactor;
	}

}