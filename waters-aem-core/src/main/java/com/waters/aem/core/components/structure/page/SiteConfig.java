package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Option;
import com.waters.aem.core.constants.WatersConstants;

@SuppressWarnings({ "squid:S115" })
public enum SiteConfig {
    @Option(text = WatersConstants.ECOMMERCE)
    eCommerce,

    @Option(text = WatersConstants.EPROCUREMENT)
    eProcurement;


    public boolean isEcommerce() {
        return WatersConstants.ECOMMERCE.equals(name());
    }

    public boolean isEprocurement() {
        return WatersConstants.EPROCUREMENT.equals(name());
    }

}
