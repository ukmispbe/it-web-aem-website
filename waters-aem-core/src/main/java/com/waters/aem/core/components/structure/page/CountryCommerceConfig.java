package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Option;

public enum CountryCommerceConfig {
    @Option(text = "Fully Enabled")
    FULL_ENABLED,

    @Option(text = "Partially Enabled")
    PARTIAL_ENABLED,

    @Option(text = "CommerceCheckout Disabled")
    COMMERCE_CHECKOUT_DISABLED,

    @Option(text = "Disabled")
    DISABLED;

    public boolean isEnabled() {
        return "FULL_ENABLED".equals(name());
    }

    public boolean isPartiallyEnabled() {
        return "PARTIAL_ENABLED".equals(name());
    }

    public boolean isDisabled() {
        return "DISABLED".equals(name());
    }

    public boolean isCommerceCheckoutDisabled() {
        return "COMMERCE_CHECKOUT_DISABLED".equals(name());
    }
}
