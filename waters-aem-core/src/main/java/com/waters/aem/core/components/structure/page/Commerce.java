package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Component(value = "Commerce",
    tabs = @Tab(
        title = "Commerce",
        renderConditionResourceType = WatersConstants.RENDER_CONDITION_CATALOG_TEMPLATE),
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = Commerce.FILE_NAME,
    touchFileName = Commerce.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Commerce {

    static final String FILE_NAME = "commerce";

    @DialogField(fieldLabel = "Currency ISO Code",
        fieldDescription = "For countries using a non-standard ISO currency code (ISO-4217) " +
                "in Waters SAP, provide the non-standard ISO code here.")
    @TextField
    @InheritInject
    private String currencyIsoCode;

    public String getCurrencyIsoCode() {
        return currencyIsoCode;
    }

}
