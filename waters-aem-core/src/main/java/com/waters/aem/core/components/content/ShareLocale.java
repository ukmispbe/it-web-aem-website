package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class)
public final class ShareLocale {

    @DialogField(fieldLabel = "Country Code",
        ranking = 1,
        required = true)
    @TextField
    @Inject
    private String countryCode;

    @DialogField(fieldLabel = "Service Codes",
        fieldDescription = "AddThis service codes for this locale.  See https://www.addthis.com/services.",
        ranking = 2,
        required = true)
    @MultiField
    @TextField
    @Inject
    private List<String> serviceCodes;

    public String getCountryCode() {
        return countryCode;
    }

    public List<String> getServiceCodes() {
        return serviceCodes;
    }
}
