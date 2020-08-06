package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.export.json.SlingModelFilter;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.node.ComponentNode;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.core.node.predicates.ComponentNodePropertyExistsPredicate;
import com.waters.aem.core.components.EmptyComponent;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.SkuList;
import com.waters.aem.core.components.content.SpecificationsTable;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
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
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PARENT)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SectionContainer.class, ComponentExporter.class },
    resourceType = SectionContainer.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SectionContainer extends AbstractComponent implements ContainerExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/sectioncontainer";

    // currently used for sku pages only. section containers holding sku components that do not have
    // any PIM data to display should be hidden.
    private static final List<String> SUPPORTED_SKU_RESOURCE_TYPES = ImmutableList.of(
            Text.RESOURCE_TYPE,
            SkuList.RESOURCE_TYPE,
            SpecificationsTable.RESOURCE_TYPE
    );

    @Inject
    private SlingModelFilter slingModelFilter;

    @OSGiService
    private ModelFactory modelFactory;

    @Self
    private SlingHttpServletRequest request;

    @Inject
    private Resource resource;

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    private Map<String, ComponentExporter> exportedItems;

    @DialogField(fieldLabel = "Title",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Collapse on Mobile",
            ranking = 2)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean collapseOnMobile;

    @DialogField(fieldLabel = "Hide on Eproc",
            ranking = 3)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean hideOnEproc;

    @JsonProperty
    public String getTitle() {
        return title;
    }

    public Boolean isCollapseOnMobile() {
        return collapseOnMobile;
    }

    public Boolean isHideOnEproc() {
        return hideOnEproc;
    }

    public Boolean isDisplaySectionContainer() {
        if (Templates.isSkuPage(currentPage)) {
            return isComponentDataEmpty();
        } else {
            return true;
        }
    }

    public Boolean hideSectionContainer(){
        return hideOnEproc && siteContext.getSiteConfig().isEprocurement();
    }

    @JsonProperty
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

    private boolean isComponentDataEmpty() {
        final List<ComponentNode> sectionComponents = getComponentNodes(ComponentConstants.NODE_NAME_PAR,
                new ComponentNodePropertyExistsPredicate(ResourceResolver.PROPERTY_RESOURCE_TYPE));

        return sectionComponents.stream()
            .filter(componentNode -> SUPPORTED_SKU_RESOURCE_TYPES.contains(componentNode.getResource().getResourceType()))
            .map(componentNode ->
                    modelFactory.getModelFromWrappedRequest(request, componentNode.getResource(), EmptyComponent.class))
            .filter(Objects::nonNull)
            .noneMatch(EmptyComponent::isEmpty) && !hideSectionContainer();
    }
}
