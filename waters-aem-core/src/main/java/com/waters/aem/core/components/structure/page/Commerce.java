package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component(value = "Commerce",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = Commerce.FILE_NAME,
    touchFileName = Commerce.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Commerce {

    static final String FILE_NAME = "commerce";

    private static final String FULL_ENABLED = "fullEnabled";

    private static final String PARTIAL_ENABLED = "partialEnabled";

    private static final String DISABLED = "disabled";

    @DialogField(fieldLabel = "Currency ISO Code",
        fieldDescription = "For countries using a non-standard ISO currency code (ISO-4217) " +
                "in Waters SAP, provide the non-standard ISO code here.")
    @TextField
    @InheritInject
    private String currencyIsoCode;

    @DialogField(fieldLabel = "Commerce Configuration",
        fieldDescription = "Select the commerce configuration option. ",
        ranking = 2)
    @Selection(
    type = Selection.SELECT,
        options = {
            @Option(text = "Full Enabled Countries", value = FULL_ENABLED ),
            @Option(text = "Partial Enabled Countries", value = PARTIAL_ENABLED),
            @Option(text = "Disabled Countries", value = DISABLED)
        }
    )
    @Inject
    @Default(values = FULL_ENABLED)
    private String commerceConfig;

    public String getCurrencyIsoCode() {
        return currencyIsoCode;
    }

    public String getCommerceConfig() {
        return commerceConfig;
    }
}
