package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.EmptyComponent;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.structure.page.CountryCommerceConfig;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

@Component(value = "SKU List With Specifications",
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuListWithSpecifications.class, EmptyComponent.class, ComponentExporter.class },
    resourceType = SkuListWithSpecifications.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuListWithSpecifications implements EmptyComponent, ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skulistwithspecifications";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @OSGiService
    private SkuRepository skuRepository;

    @Inject
    private Resource resource;

    @Self
    private SiteContext siteContext;

  @ValueMapValue
    private String[] code = new String[0];

   @ValueMapValue
    private String searchProductsLink;


    public List<DisplayableSku> getDisplayableSkus() {
        final List<Sku> skus = code.length > 0 ? buildSkuListFromDialogInput() : Collections.emptyList();
        return skus.stream()
                .map(sku -> new DisplayableSku(sku, siteContext))
                .collect(Collectors.toList());
    }

    public String getDisplayableSkusAsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getDisplayableSkus());
    }
    
    private List<Sku> buildSkuListFromDialogInput() {
        final String country = siteContext.getLocaleWithCountry().getCountry();

        return Arrays.asList(code).stream()
                .map(skuNumber -> skuRepository.getSku(resource.getResourceResolver(), skuNumber))
                .filter(Objects::nonNull)
                .filter(authoredSku -> authoredSku.getPrice(country, siteContext.getCurrencyIsoCode()) != null)
                .collect(Collectors.toList());
    }



    public CountryCommerceConfig getCommerceConfig() {
        return siteContext.getCountryCommerceConfig();
    }

    @Override
    public boolean isEmpty() {
        return getDisplayableSkus().isEmpty();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

	public String getSearchProductsLink() {
		return searchProductsLink;
	}
   
}
