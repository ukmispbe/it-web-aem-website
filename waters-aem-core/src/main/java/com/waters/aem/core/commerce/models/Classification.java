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
public final class Classification {

    @Self
    private Resource resource;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_NAME)
    private String title;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_FEATURE_VALUES)
    private String[] featureValues;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_UNIT_SYMBOL)
    private String unitSymbol;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_RANGE)
    private Boolean range;

    public String getPath() {
        return resource.getPath();
    }

    public String getTitle() {
        return title;
    }

    public String[] getFeatureValues() {
        return featureValues;
    }

    public String[] getDisplayableFeatureValues() {
        return unitSymbol == null || range ? getFeatureValues() : Arrays.stream(featureValues)
                .map(featureValue -> featureValue + " " + unitSymbol)
                .toArray(String[] :: new);
    }

    public String getFormattedFeatureValues() {
        return range ? String.join("-", getDisplayableFeatureValues()) + " " + unitSymbol :
                String.join(", ", getDisplayableFeatureValues());
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
