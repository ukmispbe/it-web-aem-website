package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.SkuDetailsHelper;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component("SKU List")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuList.class, ComponentExporter.class },
    resourceType = SkuList.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuList implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skulist";

    @Inject
    private Sku sku;

    @Inject
    private Resource resource;

    @Self
    private SiteContext siteContext;

    public List<SkuDetailsHelper> getSkus() {
        final List<Sku> skus;

        if (sku == null) {
            skus = Collections.emptyList();
        } else {
            skus = sku.getRelatedSkus();
        }

        return skus.stream()
                .map(relatedSku -> new SkuDetailsHelper(relatedSku, resource, siteContext))
                .collect(Collectors.toList());
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
