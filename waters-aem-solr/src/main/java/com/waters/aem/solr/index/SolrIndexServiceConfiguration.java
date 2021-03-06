package com.waters.aem.solr.index;

import com.waters.aem.core.constants.WatersConstants;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Index Service Configuration")
public @interface SolrIndexServiceConfiguration {

    @AttributeDefinition(name = "Enable Solr Index Service")
    boolean enabled() default false;

    @AttributeDefinition(name = "Included Paths", description = "List of paths that should be indexed.")
    String[] includedPaths() default { WatersConstants.ROOT_PATH };

    @AttributeDefinition(name = "Excluded Paths", description = "List of paths to exclude from indexing.")
    String[] excludedPaths() default {
        WatersConstants.ROOT_PATH_LANGUAGE_MASTERS,
        WatersConstants.ORDER_ROOT_PATH
    };

    @AttributeDefinition(name = "Included Templates", description = "List of templates that should be indexed.")
    String[] includedTemplates() default {
        WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE,
        WatersConstants.TEMPLATE_LIBRARY_PAGE,
        WatersConstants.TEMPLATE_SKU_PAGE
    };

    @AttributeDefinition(name = "Excluded Locales", description = "List of locales to exclude from indexing. Format is <locale> (ex: de)")
    String[] locales();
}