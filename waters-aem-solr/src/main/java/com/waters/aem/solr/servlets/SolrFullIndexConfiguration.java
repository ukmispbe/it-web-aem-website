package com.waters.aem.solr.servlets;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Recovery Full Index Configuration")
public @interface SolrFullIndexConfiguration {
	@AttributeDefinition(name = "Paths",  type = AttributeType.STRING)
	String[] getPaths() default {
			"/content/waters/cn/zh",
			"/content/waters/jp/ja",
			"/content/waters/kr/ko",
			"/content/waters/xg/fr",
			"/content/waters/ca/fr",
			"/content/waters/ch/fr",
			"/content/waters/fr/fr",
			"/content/waters/be/fr",
			"/content/waters/at/de",
			"/content/waters/ch/de",
			"/content/waters/it/it",
			"/content/waters/xg/es",
			"/content/waters/es/es",
			"/content/waters/pt/pt",
			"/content/waters/br/pt",
			"/content/waters/de/de",
			"/content/waters/mx/es",
			"/content/waters/be/en",
			"/content/waters/ca/en",
			"/content/waters/cz/en",
			"/content/waters/dk/en",
			"/content/waters/ee/en",
			"/content/waters/fi/en",
			"/content/waters/xg/en",
			"/content/waters/hk/en",
			"/content/waters/hu/en",
			"/content/waters/is/en",
			"/content/waters/in/en",
			"/content/waters/id/en",
			"/content/waters/ie/en",
			"/content/waters/lv/en",
			"/content/waters/lt/en",
			"/content/waters/my/en",
			"/content/waters/nl/en",
			"/content/waters/nz/en",
			"/content/waters/no/en",
			"/content/waters/ph/en",
			"/content/waters/pl/en",
			"/content/waters/pr/en",
			"/content/waters/sg/en",
			"/content/waters/se/en",
			"/content/waters/th/en",
			"/content/waters/gb/en",
			"/content/waters/us/en",
			"/content/waters/vn/en",
			"/content/waters/tw/zh",
			"/content/waters/au/en"
	};

	@AttributeDefinition(name = "numShards",  type = AttributeType.STRING)
	String getNumShards() default "1";

	@AttributeDefinition(name = "replicationFactor",  type = AttributeType.STRING)
	String getReplicationFactor() default "3";

}