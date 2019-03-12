package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.day.cq.wcm.foundation.Image;
import com.day.cq.wcm.foundation.model.responsivegrid.ResponsiveGrid;
import com.icfolson.aem.library.models.annotations.ImageInject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Component(value = "Layout Container",
    resourceSuperType = "wcm/foundation/components/responsivegrid",
    isContainer = true,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class LayoutContainer extends ResponsiveGrid {

    public static final String RESOURCE_TYPE = "waters/components/content/layoutcontainer";

    @DialogField(fieldLabel = "Background Image")
    @Html5SmartImage(allowUpload = false, tab = false, isSelf = true)
    @ImageInject(isSelf = true)
    private Image backgroundImage;

    public Image getBackgroundImage() {
        return backgroundImage;
    }
}
