package com.waters.aem.core.commerce.models;

import com.google.common.base.Objects;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.utils.ResourceUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@SuppressWarnings({ "squid:HiddenFieldCheck" })
public final class Classification {

    @Self
    private Resource resource;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_CODE)
    private String code;

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_NAME)
    private String title;

    public String getPath() {
        return resource.getPath();
    }

    public String getCode() {
        return code;
    }

    public String getTitle() {
        return title;
    }

    public List<Feature> getFeatures() {
        return ResourceUtils.getResourceModels(resource, WatersCommerceConstants.RESOURCE_NAME_FEATURES,
                resource -> true,
                resource -> resource.adaptTo(Feature.class));
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("resource", resource.getPath())
            .toString();
    }
}
