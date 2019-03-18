package com.waters.aem.core.components.content.list;

import com.adobe.cq.wcm.core.components.models.ListItem;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.Thumbnail;

import javax.annotation.Nullable;
import java.util.Calendar;

public final class WatersListItem implements ListItem {

    private final ListItem listItem;

    private final PageDecorator page;

    WatersListItem(final ListItem listItem, final PageDecorator page) {
        this.listItem = listItem;
        this.page = page;
    }

    @Override
    @Nullable
    public String getURL() {
        return page.getHref();
    }

    @Override
    @Nullable
    public String getTitle() {
        return listItem.getTitle();
    }

    @Override
    @Nullable
    public String getDescription() {
        return listItem.getDescription();
    }

    @Override
    @Nullable
    public Calendar getLastModified() {
        return listItem.getLastModified();
    }

    @Override
    @Nullable
    public String getPath() {
        return listItem.getPath();
    }

    @Override
    @Nullable
    public String getName() {
        return listItem.getName();
    }

    public String getThumbnailImage() {
        return page.getContentResource().adaptTo(Thumbnail.class).getThumbnailImageRendition();
    }
}
