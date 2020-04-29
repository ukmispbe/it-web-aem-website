package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Property;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.commons.LanguageUtil;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.ResourceResolverService;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Component(value = "Commerce",
        tabs = @Tab(
                title = "Commerce",
                renderConditionResourceType = WatersConstants.RENDER_CONDITION_COMMERCE_TAB),
        group = ComponentConstants.GROUP_HIDDEN,
        path = WatersConstants.COMPONENT_PATH_STRUCTURE,
        name = WatersConstants.COMPONENT_NAME_PAGE,
        editConfig = false,
        fileName = Commerce.FILE_NAME,
        touchFileName = Commerce.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Commerce {

    static final String FILE_NAME = "commerce";

    private static final Logger LOG = LoggerFactory.getLogger(Commerce.class);

    @Inject
    private Resource resource;

    @Inject
    private ResourceResolverService resourceResolverService;

    @DialogField(fieldLabel = "Country Commerce Configuration",
            fieldDescription = "Select the commerce configuration option to apply to this country.",
            ranking = 1,
            additionalProperties = @Property(name = "emptyOption", value = "{Boolean}true"))
    @Selection(type = Selection.SELECT)
    @InheritInject
    private CountryCommerceConfig countryCommerceConfig = CountryCommerceConfig.FULL_ENABLED;

    @DialogField(fieldLabel = "Currency ISO Code",
            fieldDescription = "For countries using a non-standard ISO currency code (ISO-4217) " +
                    "in Waters SAP, provide the non-standard ISO code here.",
            ranking = 2)
    @TextField
    @InheritInject
    private String currencyIsoCode;

    @DialogField(fieldLabel = "Currency Language Override",
            fieldDescription = "Two character language code used to format the currency display. Setting this will " +
                    "override the default.",
            ranking = 3)
    @TextField
    @InheritInject
    private String currencyLanguageCode;

    @DialogField(fieldLabel = "Currency Country Override",
            fieldDescription = "Two character country code used to format the currency display. Setting this will " +
                    "override the default.",
            ranking = 4)
    @TextField
    @InheritInject
    private String currencyCountryCode;

    @DialogField(fieldLabel = "Add To Cart URL",
            fieldDescription = "Enter the Commerce Add to Cart URL. This will override default url configured in OSGI service",
            ranking = 5)
    @TextField
    @InheritInject
    private String addToCartUrl;

    @PostConstruct
    private void init() {
            try {
                String languageRoot = LanguageUtil.getLanguageRoot(resource.getPath());
                ResourceResolver resourceResolver = resourceResolverService.getResourceResolver("watersService");
                Resource languageRootResource = resourceResolver.getResource(languageRoot+"/jcr:content");
                ModifiableValueMap modifiableValueMap = languageRootResource.adaptTo(ModifiableValueMap.class);
                if (StringUtils.isBlank(addToCartUrl)) {
                    modifiableValueMap.put("commerceAPI", false);
                }else {
                    modifiableValueMap.put("commerceAPI", true);
                }
                resourceResolver.commit();
            } catch (Exception e) {
                LOG.error("Exception occurred while setting commerceAPI property: {}", e);
            }
    }

    public String getAddToCartUrl() {
        return addToCartUrl;
    }

    public CountryCommerceConfig getCountryCommerceConfig() {
        return countryCommerceConfig;
    }

    public String getCurrencyIsoCode() {
        return currencyIsoCode;
    }
}
