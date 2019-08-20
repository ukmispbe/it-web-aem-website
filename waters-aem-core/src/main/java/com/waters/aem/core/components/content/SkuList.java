package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.EmptyComponent;
import com.waters.aem.core.components.SiteContext;
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

@Component(value = "SKU List",
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuList.class, EmptyComponent.class, ComponentExporter.class },
    resourceType = SkuList.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuList implements EmptyComponent, ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skulist";

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
        fieldDescription = "List of Skus to display when this component is authored on a non-Sku page.",
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
            skus = sku.getRelatedSkus();
        }

        return skus.stream()
                .map(relatedSku -> new DisplayableSku(relatedSku, resource, siteContext))
                .collect(Collectors.toList());
    }

    private List<Sku> buildSkuListFromDialogInput() {
        return Arrays.asList(skuNumbers).stream()
                .map(skuNumber -> skuRepository.getSku(resource.getResourceResolver(), skuNumber))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public String getTitle() {
        return title;
    }

    public String getAnonymousUserCommerceConfig() {
        return siteContext.getCommerceConfig();
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
