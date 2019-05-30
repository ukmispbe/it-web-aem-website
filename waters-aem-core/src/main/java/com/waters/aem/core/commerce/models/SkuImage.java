package com.waters.aem.core.commerce.models;

import com.google.common.base.Objects;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Inject;
import javax.inject.Named;
import java.net.URI;
import java.net.URISyntaxException;

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

    public String getPath() {
        String path;

        try {
            path = new URI(url).getPath();
        } catch (URISyntaxException e) {
            path = url;
        }

        return path;
    }

    public SkuImageType getImageType() {
        return imageType;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("imageType", imageType)
            .add("url", url)
            .add("path", getPath())
            .toString();
    }
}
