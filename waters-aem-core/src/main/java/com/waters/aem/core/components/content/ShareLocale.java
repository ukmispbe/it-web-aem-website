package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.google.common.base.Objects;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;

@Model(adaptables = Resource.class)
public final class ShareLocale {

    @DialogField(fieldLabel = "Country",
        fieldDescription = "Country ISO code for this locale, e.g. 'US'.",
        ranking = 1,
        required = true)
    @TextField
    @Inject
    private String country;

    @DialogField(fieldLabel = "Service Codes",
        fieldDescription = "AddThis service codes for this locale.  See https://www.addthis.com/services.",
        ranking = 2,
        required = true)
    @MultiField
    @TextField
    @Inject
    private String[] serviceCodes;

    public String getCountry() {
        return country;
    }

    public List<String> getServiceCodes() {
        return Arrays.asList(serviceCodes);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("country", getCountry())
            .add("serviceCodes", getServiceCodes())
            .toString();
    }
}
