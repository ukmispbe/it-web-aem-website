package com.waters.aem.core.components.content.list;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.CheckBox;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.api.Page;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
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
    editConfig = false,
    tabs = {
        @Tab(title = "List Settings", touchUINodeName = "listSettings"),
        @Tab(title = "Item Settings", touchUINodeName = "itemSettings")
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = com.adobe.cq.wcm.core.components.models.List.class,
    resourceType = List.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)

@SuppressWarnings({"squid:S2176"})
public final class List implements com.adobe.cq.wcm.core.components.models.List {

    static final String RESOURCE_TYPE = "waters/components/content/list";

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/list/v2/list";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.List delegate; // delegate to core component class

    @Inject
    private PageManagerDecorator pageManager;

    @DialogField(fieldLabel = "Title", orderBefore = "listFrom")
    @TextField
    @Inject
    private String title;

    @DialogField(fieldDescription = "Select this option to show thumbnail",
        value = "true",
        tab = 2,
        ranking = 4)
    @CheckBox(title = "showThumbNail",
        text = "Show thumbnail")
    @Inject
    private Boolean showThumbNail;

    public String getTitle() {
        return title;
    }

    public Boolean isShowThumbNail() {
        return showThumbNail;
    }

    @Nonnull
    @Override
    public Collection<ListItem> getListItems() {
        final Collection<ListItem> listItems = new ArrayList<>();

        for (final Page listItem : delegate.getItems()) {
            final PageDecorator page = pageManager.getPage(listItem.getPath());

            if (page != null) {
                listItems.add(new WatersListItem(listItem, page));
            }
        }

        return listItems;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    // delegate methods

    @Override
    public Collection<Page> getItems() {
        return delegate.getItems();
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

    @Override
    public String getId() {
        return delegate.getId();
    }
}
