package com.waters.aem.hybris.result;

import com.google.common.collect.ImmutableMap;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.hybris.enums.HybrisImportContentType;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Map;

public final class HybrisImporterResult {

    public static HybrisImporterResult fromCategoryPage(final PageDecorator page, final HybrisImportStatus status) {
        return new HybrisImporterResult(page.getPath(), page.getTitle(), HybrisImportContentType.CATEGORY, status);
    }

    public static HybrisImporterResult fromSku(final PageDecorator page, final HybrisImportStatus status) {
        return new HybrisImporterResult(page.getPath(), page.getTitle(), HybrisImportContentType.SKU, status);
    }

    public static HybrisImporterResult fromMap(final Map<String, String> map) {
        return new HybrisImporterResult(map.get("path"), map.get("title"),
            HybrisImportContentType.valueOf(map.get("contentType")), HybrisImportStatus.valueOf(map.get("status")));
    }

    private String path;

    private String title;

    private HybrisImportContentType contentType;

    private HybrisImportStatus status;

    private HybrisImporterResult(final String path, final String title, final HybrisImportContentType contentType,
        final HybrisImportStatus status) {
        this.path = path;
        this.title = title;
        this.contentType = contentType;
        this.status = status;
    }

    public String getPath() {
        return path;
    }

    public String getTitle() {
        return title;
    }

    public HybrisImportContentType getContentType() {
        return contentType;
    }

    public HybrisImportStatus getStatus() {
        return status;
    }

    public Map<String, String> toMap() {
        return new ImmutableMap.Builder<String, String>()
            .put("path", path)
            .put("title", title)
            .put("contentType", contentType.name())
            .put("status", status.name())
            .build();
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
