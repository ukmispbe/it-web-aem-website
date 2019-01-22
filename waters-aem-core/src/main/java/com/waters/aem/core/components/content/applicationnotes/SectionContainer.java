package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.export.json.SlingModelFilter;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PARENT;

@Component(value = "Section Container",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES,
    isContainer = true,
    tabs = {
        @Tab(title = "Properties")
    },
    listeners = { // refresh parent resource after edit to prevent issues with anchor component
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PARENT)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SectionContainer.class, ComponentExporter.class },
    resourceType = SectionContainer.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SectionContainer extends AbstractComponent implements ContainerExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/sectioncontainer";

    @Inject
    private SlingModelFilter slingModelFilter;

    @OSGiService
    private ModelFactory modelFactory;

    @Self
    private SlingHttpServletRequest request;

    @Inject
    private Resource resource;

    private Map<String, ComponentExporter> exportedItems;

    @DialogField(fieldLabel = "Title",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String title;

    public String getTitle() {
        return title;
    }

    public Link getAnchorLink() {
        // use generated ID for anchor
        return LinkBuilderFactory.forPath("#" + getId())
            .setTitle(getTitle())
            .build();
    }

    @Nonnull
    @Override
    public Map<String, ? extends ComponentExporter> getExportedItems() {
        if (exportedItems == null) {
            exportedItems = new LinkedHashMap<>();

            for (final Resource child : slingModelFilter.filterChildResources(resource.getChildren())) {
                final ComponentExporter model = modelFactory.getModelFromWrappedRequest(request, child,
                    ComponentExporter.class);

                if (model != null) {
                    exportedItems.put(child.getName(), model);
                }
            }
        }

        return exportedItems;
    }

    @Nonnull
    @Override
    public String[] getExportedItemsOrder() {
        return getExportedItems().keySet().toArray(new String[0]);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
