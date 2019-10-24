package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
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

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "SKU List",
    tabs = @Tab(title = "Properties"),
    listeners = {
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuList.class, EmptyComponent.class, ComponentExporter.class },
    resourceType = SkuList.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuList implements EmptyComponent, ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skulist";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Inject
    private Sku sku;

    @OSGiService
    private SkuRepository skuRepository;

    @Inject
    private Resource resource;

    @Self
    private SiteContext siteContext;

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter the Title",
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Sku Numbers",
        fieldDescription = "List of Skus to display when this component is authored on a non-SKU page. Any SKUs not " +
                "sold in the current country will not be displayed. (Default country is US if no other country is " +
                "found)",
        renderReadOnly = false,
        required = true,
        ranking = 2)
    @MultiField
    @TextField
    @Inject
    private String[] skuNumbers = new String[0];

    public List<DisplayableSku> getDisplayableSkus() {
        final List<Sku> skus;

        if (sku == null) {
            skus = skuNumbers.length > 0 ? buildSkuListFromDialogInput() : Collections.emptyList();
        } else {
            skus = sku.getRelatedSkus(siteContext);
        }

        return skus.stream()
                .map(relatedSku -> new DisplayableSku(relatedSku, siteContext))
                .collect(Collectors.toList());
    }

    public String getDisplayableSkusAsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getDisplayableSkus());
    }
    
    private List<Sku> buildSkuListFromDialogInput() {
        final String country = siteContext.getLocaleWithCountry().getCountry();

        return Arrays.asList(skuNumbers).stream()
                .map(skuNumber -> skuRepository.getSku(resource.getResourceResolver(), skuNumber))
                .filter(Objects::nonNull)
                .filter(sku -> sku.getPrice(country, siteContext.getCurrencyIsoCode()) != null)
                .collect(Collectors.toList());
    }

    public String getTitle() {
        return title;
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
}
