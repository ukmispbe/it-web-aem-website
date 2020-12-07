package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Property;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.CheckBox;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

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

    @DialogField(fieldLabel = "Site Configuration",
            fieldDescription = "Select the site configuration options",
            ranking = 1,
            additionalProperties = @Property(name = "emptyOption", value = "{Boolean}true"))
    @Selection(type = Selection.SELECT)
    @InheritInject
    private SiteConfig siteConfig = SiteConfig.eCommerce;

    @DialogField(fieldLabel = "Country Commerce Configuration",
            fieldDescription = "Select the commerce configuration option to apply to this country.",
            ranking = 2,
            additionalProperties = @Property(name = "emptyOption", value = "{Boolean}true"))
    @Selection(type = Selection.SELECT)
    @InheritInject
    private CountryCommerceConfig countryCommerceConfig = CountryCommerceConfig.FULL_ENABLED;

    @DialogField(fieldLabel = "Currency ISO Code",
            fieldDescription = "For countries using a non-standard ISO currency code (ISO-4217) " +
                    "in Waters SAP, provide the non-standard ISO code here.",
            ranking = 3)
    @TextField
    @InheritInject
    private String currencyIsoCode;

    @DialogField(fieldLabel = "Currency Language Override",
            fieldDescription = "Two character language code used to format the currency display. Setting this will " +
                    "override the default.",
            ranking = 4)
    @TextField
    @InheritInject
    private String currencyLanguageCode;

    @DialogField(fieldLabel = "Currency Country Override",
            fieldDescription = "Two character country code used to format the currency display. Setting this will " +
                    "override the default.",
            ranking = 5)
    @TextField
    @InheritInject
    private String currencyCountryCode;

    @DialogField(fieldLabel = "Add To Cart URL",
            fieldDescription = "Enter the Commerce Add to Cart URL. This will override default url configured in OSGI service",
            ranking = 6)
    @TextField
    @InheritInject
    private String addToCartUrl;

    @DialogField(fieldLabel = "View Cart URL",
            fieldDescription = "Enter the Commerce View Cart URL. This will override default url configured in OSGI service",
            ranking = 7)
    @TextField
    @InheritInject
    private String viewCartUrl;

    @DialogField(fieldDescription = "Enable this to make Add to Cart and View Cart URL effective",
            value = "true",
            ranking = 8)
    @CheckBox(title = "commerceAPI",
            text = "Commerce API Migrated")
    @Inject
    private Boolean commerceAPI;

    @DialogField(fieldDescription = "Enable this to disable Mule Customer Price URL",
            value = "true",
            ranking = 9)
    @CheckBox(title = "customerPriceApiDisabled",
            text = "Disable Mule CustomerPrice API")
    @Inject
    private Boolean customerPriceApiDisabled;

    @DialogField(fieldDescription = "Enable this to make Checkout  Disable",
            value = "true",
            ranking = 10)
    @CheckBox(title = "checkoutDisabled",
            text = "Disable Checkout")
    @Inject
    private Boolean checkoutDisabled;

    @DialogField(fieldDescription = "Enable this to make Quote  Disable",
            value = "true",
            ranking = 11)
    @CheckBox(title = "quoteDisabled",
            text = "Disable Quote")
    @Inject
    private Boolean quoteDisabled;

    @DialogField(fieldDescription = "Enable this to always allow PO payment.",
            value = "true",
            ranking = 12)
    @CheckBox(title = "explicitAllowPO",
            text = "Always allow PO payment")
    @Inject
    private Boolean explicitAllowPO;

    public String getAddToCartUrl() {
        return addToCartUrl;
    }

    public SiteConfig getSiteConfig() {
        return siteConfig;
    }

    public CountryCommerceConfig getCountryCommerceConfig() {
        return countryCommerceConfig;
    }

    public String getCurrencyIsoCode() {
        return currencyIsoCode;
    }
}
