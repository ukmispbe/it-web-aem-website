package com.waters.aem.core.components.content.list;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.wcm.api.Page;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;

@Component(value = "List",
    description = "List component for Waters site",
    resourceSuperType = List.RESOURCE_SUPER_TYPE,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class, resourceType = List.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class List implements com.adobe.cq.wcm.core.components.models.List {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/list/v2/list";

    public static final String RESOURCE_TYPE = "waters/components/content/list";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.List delegate; // delegate to core component class

    @Inject
    private PageManagerDecorator pageManager;

    public Collection<WatersListItem> getWatersListItems() {
        final Collection<WatersListItem> listItems = new ArrayList<>();

        for (final ListItem listItem : getListItems()) {
            final PageDecorator page = pageManager.getPage(listItem.getPath());

            if (page != null) {
                listItems.add(new WatersListItem(listItem, page));
            }
        }

        return listItems;
    }

    @Override
    public Collection<Page> getItems() {
        return delegate.getItems();
    }

    @Nonnull
    @Override
    public Collection<ListItem> getListItems() {
        return delegate.getListItems();
    }

    @Override
    public boolean linkItems() {
        return delegate.linkItems();
    }

    @Override
    public boolean showDescription() {
        return delegate.showDescription();
    }

    @Override
    public boolean showModificationDate() {
        return delegate.showModificationDate();
    }

    @Override
    public String getDateFormatString() {
        return delegate.getDateFormatString();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
