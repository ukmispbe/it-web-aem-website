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

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_FACET)
    private Boolean facet;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CODE)
    private String code;

    public String getPath() {
        return resource.getPath();
    }

    public String getTitle() {
        return title;
    }

    public String[] getFeatureValues() {
        return featureValues;
    }

    public String getCode() {
        return code;
    }

    public Boolean isFacet() {
        return facet;
    }

    /**
     * Checks if the feature value is a "range" property and concatenates the values with a hyphen if so.
     * ex: "1 - 12 pH" where "1" is a feature value and "12" is another feature value.
     * If not a range and we still have multiple values, concatenate displayed values with a comma.
     *
     * @return the formatted feature values displayed on the UI
     */
    public String getFormattedFeatureValues() {
        return range ? String.join("-", getDisplayableFeatureValues()) + " " + unitSymbol :
                String.join(", ", getDisplayableFeatureValues());
    }

    public String[] getDisplayableFeatureValues() {
        return unitSymbol == null || range ? getFeatureValues() : Arrays.stream(featureValues)
                .map(featureValue -> featureValue + " " + unitSymbol)
                .toArray(String[] :: new);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
