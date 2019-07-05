package com.waters.aem.core.commerce.models;

import com.google.common.base.Objects;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Arrays;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@SuppressWarnings({ "squid:HiddenFieldCheck" })
public final class Feature {

    @Self
    private Resource resource;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CODE)
    private String code;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_NAME)
    private String title;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_FEATURE_VALUES)
    private String[] featureValues;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_UNIT)
    private String unit;

    public String getPath() {
        return resource.getPath();
    }


    public String getCode() {
        return code;
    }

    public String getTitle() {
        return title;
    }

    public String[] getFeatureValues() {
        return featureValues;
    }

    public String getUnit() {
        return unit;
    }

    public String[] getDisplayableFeatureValues() {
        return unit == null ? getFeatureValues() : Arrays.stream(featureValues)
                .map(featureValue -> featureValue + " " + unit)
                .toArray(String[] :: new);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
