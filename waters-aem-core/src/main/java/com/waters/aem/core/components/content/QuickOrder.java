package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.commerce.WatersCommerceService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

@Component(value = "Quick Order",
        description = "This is the Quick Order component for Waters site",
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
        })
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {QuickOrder.class, ComponentExporter.class},
        resourceType = QuickOrder.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class QuickOrder implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/quickorder";

    @Self
    private SiteContext siteContext;

    @OSGiService
    private WatersCommerceService watersCommerceService;

    @DialogField(fieldLabel = "Button Label",
            fieldDescription = "The text to display on the Button",
            ranking = 1)
    @TextField
    @Inject
    private String buttonLabel;

    public String getButtonLabel() {
        return buttonLabel;
    }

    @DialogField(fieldLabel = "Search Placeholder",
            fieldDescription = "The text to display on the Button",
            ranking = 2)
    @TextField
    @Inject
    private String searchPlaceHolder;

    public String getSearchPlaceHolder() {
        return searchPlaceHolder;
    }

    @DialogField(fieldLabel = "Additional Button Label",
            fieldDescription = "The text to display on the additional link",
            ranking = 3)
    @TextField
    @Inject
    private String additionalButtonLabel;

    public String getAdditionalButtonLabel() {
        return additionalButtonLabel;
    }

    @DialogField(fieldLabel = "Additional Button Link",
            fieldDescription = "The path of the additional button link",
            required = true,
            ranking = 4)
    @PathField(rootPath = WatersConstants.ORDER_ROOT_PATH)
    @LinkInject
    private Link additionalButtonLink;

    public String getAdditionalButtonLink() {
        return additionalButtonLink.getPath();
    }

    public String getAddToCartUrl() {
        if (isCommerceApiMigrated()) {
            return siteContext.getAddToCartURL();
        } else {
            return watersCommerceService.getAddToCartUrl();
        }
    }

    public boolean isCommerceApiMigrated() {
        return siteContext.isCommerceApiMigrated();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return null;
    }
}
