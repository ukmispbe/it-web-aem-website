package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component(value = "Thumbnail",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = Thumbnail.FILE_NAME,
    touchFileName = Thumbnail.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Thumbnail {

    static final String FILE_NAME = "thumbnail";

    private static final String RENDITION_PREFIX = "cq5dam.thumbnail.319";

    @Inject
    private ResourceResolver resourceResolver;

    // use pathfield widget because page properties dialog hides the asset finder
    @DialogField(fieldLabel = "Thumbnail Image", name = "./thumbnailImage/" + Image.PN_REFERENCE)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @ImageInject
    private Image thumbnailImage;

    public Image getThumbnailImage() {
        return thumbnailImage;
    }

    public String getThumbnailImageRendition() {
        String thumbnailImageRendition = null;

        if (thumbnailImage != null) {
            final Resource assetResource = resourceResolver.getResource(thumbnailImage.getFileReference());

            if (assetResource != null) {
                final Asset asset = assetResource.adaptTo(Asset.class);

                thumbnailImageRendition = new PrefixRenditionPicker(RENDITION_PREFIX, true)
                    .getRendition(asset)
                    .getPath();
            }
        }

        return thumbnailImageRendition;
    }
}
