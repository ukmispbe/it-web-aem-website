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

    @DialogField(fieldDescription = "Enable this to disable Mule Customer Price URL",
            value = "true",
            ranking = 3)
    @CheckBox(title = "customerPriceApiDisabled",
            text = "Disable Mule CustomerPrice API")
    @Inject
    private Boolean customerPriceApiDisabled;

    @DialogField(fieldDescription = "Enable this to make Checkout  Disable",
            value = "true",
            ranking = 4)
    @CheckBox(title = "checkoutDisabled",
            text = "Disable Checkout")
    @Inject
    private Boolean checkoutDisabled;

    @DialogField(fieldDescription = "Enable this to make Quote  Disable",
            value = "true",
            ranking = 5)
    @CheckBox(title = "quoteDisabled",
            text = "Disable Quote")
    @Inject
    private Boolean quoteDisabled;

    @DialogField(fieldDescription = "Enable this to always allow PO payment.",
            value = "true",
            ranking = 6)
    @CheckBox(title = "explicitAllowPO",
            text = "Always allow PO payment")
    @Inject
    private Boolean explicitAllowPO;

    public SiteConfig getSiteConfig() {
        return siteConfig;
    }

    public CountryCommerceConfig getCountryCommerceConfig() {
        return countryCommerceConfig;
    }
}
