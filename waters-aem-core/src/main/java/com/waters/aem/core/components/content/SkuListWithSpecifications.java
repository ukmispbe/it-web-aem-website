package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.EmptyComponent;
import com.waters.aem.core.components.SiteContext;

@Component(value = "SKU List With Specifications",
listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    },
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuListWithSpecifications.class, ComponentExporter.class },
    resourceType = SkuListWithSpecifications.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public final class SkuListWithSpecifications implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skulistwithspecifications";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @OSGiService
    private SkuRepository skuRepository;

    @DialogField(fieldLabel = "Sku Numbers",
            fieldDescription = "Enter the Sku Number",
            renderReadOnly = false,
            required = true,
            ranking = 1)
        @MultiField
        @TextField
        @Inject
        
    private String[] skuCodeList = new String[0];

    @DialogField(fieldLabel = "View All Products Link",
        fieldDescription = "Enter the Search Link to view all the products ",
        ranking = 2)
    @PathField
    @Inject
    
    private String searchProductsLink;
   
   @Inject
   private Sku sku;

   @Inject
   private Resource resource;

   @Self
   private SiteContext siteContext;

   public DisplayableSku getDisplayableSku() {
       return sku == null ? null : new DisplayableSku(sku, siteContext);
   }

   @Nonnull
   @Override
   public String getExportedType() {
       return RESOURCE_TYPE;
   }
}