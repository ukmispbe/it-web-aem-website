package com.waters.aem.solr.servlets;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Recovery Full Index Configuration")
public @interface SolrFullIndexConfiguration {
	
	@AttributeDefinition(name = "numShards",  type = AttributeType.STRING)
	String numShards() default "1";

	@AttributeDefinition(name = "replicationFactor",  type = AttributeType.STRING)
	String replicationFactor() default "3";
}
