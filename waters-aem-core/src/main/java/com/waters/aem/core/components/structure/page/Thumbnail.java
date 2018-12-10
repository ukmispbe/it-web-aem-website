package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

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

    // use pathfield widget because page properties dialog hides the asset finder
    @DialogField(fieldLabel = "Thumbnail Image", fieldName = "thumbnailImage/" + Image.PN_REFERENCE)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @ImageInject
    private Image thumbnailImage;

    public Image getThumbnailImage() {
        return thumbnailImage;
    }
}
