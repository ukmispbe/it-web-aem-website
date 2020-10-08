package com.waters.aem.core.components.content.list;

import com.adobe.cq.wcm.core.components.models.ListItem;
import com.day.cq.wcm.api.Page;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.Thumbnail;

import javax.annotation.Nullable;
import java.util.Calendar;

public final class WatersListItem implements ListItem {

    private final Page listItem;

    private final PageDecorator page;

    WatersListItem(final Page listItem, final PageDecorator page) {
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
        String title = listItem.getNavigationTitle();
        if (title == null) {
            title = listItem.getPageTitle();
        }
        if (title == null) {
            title = listItem.getTitle();
        }
        if (title == null) {
            title = listItem.getName();
        }
        return title;
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
