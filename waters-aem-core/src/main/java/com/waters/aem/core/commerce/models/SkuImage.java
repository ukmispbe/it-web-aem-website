package com.waters.aem.core.commerce.models;

import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SkuImage {

    @ValueMapValue(name = WatersCommerceConstants.PROPERTY_URL)
    private String url;

    @Inject
    @Named(WatersCommerceConstants.PROPERTY_IMAGE_TYPE)
    private SkuImageType imageType;

    public String getUrl() {
        return url;
    }

    public SkuImageType getImageType() {
        return imageType;
    }
}
