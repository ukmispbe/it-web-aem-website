package com.waters.aem.solr.client.impl;

import com.waters.aem.solr.client.SolrIndexClient;
import com.waters.aem.solr.client.SolrIndexClientConfiguration;
import com.waters.aem.solr.index.impl.DefaultSolrIndexService;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.request.UpdateRequest;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component(immediate = true, service = SolrIndexClient.class)
@Designate(ocd = SolrIndexClientConfiguration.class)
public class DefaultSolrIndexClient implements SolrIndexClient {
	
	private static final Logger LOG = LoggerFactory.getLogger(DefaultSolrIndexService.class);

    private volatile SolrClient solrClient;
        
    private volatile int commitWithinMs;

    private volatile boolean hardCommit;

    private volatile String collection;
    
    private volatile boolean enableAuthentication;
    
    private volatile String userName;
    
    private volatile String password;

    @Override
    public boolean addToIndex(final List<SolrInputDocument> documents) throws IOException, SolrServerException {
    	  UpdateRequest req = new UpdateRequest();
    	    req.add(documents);
    	    req.setCommitWithin(commitWithinMs);
    	    if(enableAuthentication) {
    	    req.setBasicAuthCredentials(userName,password);
    	    }
    	return processResponse(req.process(solrClient, collection), req);
    }

    @Override
    public boolean deleteFromIndex(final List<String> ids) throws IOException, SolrServerException {
    	UpdateRequest req = new UpdateRequest();
        req.deleteById(ids);
        req.setCommitWithin(commitWithinMs);
        if(enableAuthentication) {
	    req.setBasicAuthCredentials(userName, password);
        }
    	return processResponse(req.process(solrClient, collection), req);
    }
    @Override
    public boolean addToIndex(final SolrInputDocument document) throws IOException, SolrServerException {
    	  UpdateRequest req = new UpdateRequest();
    	    req.add(document);
    	    req.setCommitWithin(commitWithinMs);
    	    if(enableAuthentication) {
    	    req.setBasicAuthCredentials(userName,password);
    	    }
    	return processResponse(req.process(solrClient, collection), req);
    }

    @Override
    public boolean deleteFromIndex(final String id) throws IOException, SolrServerException {
    	UpdateRequest req = new UpdateRequest();
        req.deleteById(id);
        req.setCommitWithin(commitWithinMs);
        if(enableAuthentication) {
	    req.setBasicAuthCredentials(userName, password);
        }
    	return processResponse(req.process(solrClient, collection), req);
    }
    
	@Activate
    @Modified
    protected void activate(final SolrIndexClientConfiguration configuration) {
        commitWithinMs = configuration.commitWithinMs();
        hardCommit = configuration.hardCommit();
        collection = configuration.collection();
        enableAuthentication = configuration.enableAuthentication();
        userName = configuration.userName();
        password = configuration.password();
        final List<String> zkServers = Arrays.asList(configuration.zookeeperUrl());
      
        solrClient = new CloudSolrClient.Builder(zkServers, Optional.empty())
                .withConnectionTimeout(configuration.connectionTimeout())
                .withSocketTimeout(configuration.socketTimeout()) .build();
      
        LOG.info("created solr client, commit within : {}ms, hard commit : {}, collection : {}", commitWithinMs,
            hardCommit, collection);
    }
	
    @Deactivate
    protected void deactivate() {
        solrClient = null;
    }

    private boolean processResponse(final UpdateResponse updateResponse, UpdateRequest req) throws IOException, SolrServerException {
        boolean success = getStatus(updateResponse, false);

        if (success && hardCommit) {
            success = getStatus(req.commit(solrClient,collection), true);
        }

        return success;
    }

    private boolean getStatus(final UpdateResponse updateResponse, final boolean isCommit) {
        LOG.debug("solr " + (isCommit ? "commit" : "update") + " response status = {}", updateResponse.getStatus());

        return updateResponse.getStatus() == 0;
    }
    
 }
