package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Option;

public enum SiteConfig {
    @Option(text = "eCommerce")
    eCommerce,

    @Option(text = "eProcurement")
    eProcurement;


    public boolean isEcommerce() {
        return "eCommerce".equals(name());
    }

    public boolean isEprocurement() {
        return "eProcurement".equals(name());
    }

}
