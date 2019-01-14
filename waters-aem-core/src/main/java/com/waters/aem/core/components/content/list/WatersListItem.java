package com.waters.aem.core.components.content.list;

import com.adobe.cq.wcm.core.components.models.ListItem;
import com.day.cq.commons.DownloadResource;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.Thumbnail;

import javax.annotation.Nullable;
import java.util.Calendar;
import java.util.Optional;

public final class WatersListItem implements ListItem {

    private final ListItem listItem;

    private final PageDecorator page;

    public WatersListItem(final ListItem listItem, final PageDecorator page) {
        this.listItem = listItem;
        this.page = page;
    }

    @Override
    @Nullable
    public String getURL() {
        return listItem.getURL();
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
        final Thumbnail thumbnail = page.getContentResource().adaptTo(Thumbnail.class);

        return Optional.ofNullable(thumbnail.getThumbnailImage())
            .map(DownloadResource :: getFileReference)
            .orElse(null);
    }
}
