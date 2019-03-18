package com.waters.aem.core.tagging;

import com.day.cq.commons.Filter;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.google.common.collect.Iterators;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

public final class WatersTag implements Tag {

    private final Tag tag;

    private final ValueMap properties;

    WatersTag(final Tag tag) {
        this.tag = tag;

        properties = tag.adaptTo(Resource.class).getValueMap();
    }

    @CheckForNull
    @Override
    public <AdapterType> AdapterType adaptTo(@Nonnull final Class<AdapterType> type) {
        return tag.adaptTo(type);
    }

    @Override
    public String getTitle() {
        return properties.get(JcrConstants.JCR_TITLE, "");
    }

    @Override
    public String getTitle(final Locale locale) {
        return getLocalizedTitle(locale, true);
    }

    @Override
    public String getLocalizedTitle(final Locale locale) {
        return getLocalizedTitle(locale, false);
    }

    @Override
    public Map<Locale, String> getLocalizedTitles() {
        return tag.getLocalizedTitles();
    }

    @Override
    public String getDescription() {
        return tag.getDescription();
    }

    @Override
    public String getTitlePath() {
        return tag.getTitlePath();
    }

    @Override
    public String getTitlePath(final Locale locale) {
        return tag.getTitlePath(locale);
    }

    @Override
    public Map<Locale, String> getLocalizedTitlePaths() {
        return tag.getLocalizedTitlePaths();
    }

    @Override
    public long getCount() {
        return tag.getCount();
    }

    @Override
    public long getLastModified() {
        return tag.getLastModified();
    }

    @Override
    public String getLastModifiedBy() {
        return tag.getLastModifiedBy();
    }

    @Override
    public boolean isNamespace() {
        return tag.isNamespace();
    }

    @Override
    public Tag getNamespace() {
        return new WatersTag(tag.getNamespace());
    }

    @Override
    public Tag getParent() {
        return new WatersTag(tag.getParent());
    }

    @Override
    public Iterator<Tag> listChildren() {
        return Iterators.transform(tag.listChildren(), WatersTag ::new);
    }

    @Override
    public Iterator<Tag> listChildren(final Filter<Tag> filter) {
        return Iterators.transform(tag.listChildren(filter), WatersTag ::new);
    }

    @Override
    public Iterator<Tag> listAllSubTags() {
        return Iterators.transform(tag.listAllSubTags(), WatersTag ::new);
    }

    @Override
    public Iterator<Resource> find() {
        return tag.find();
    }

    @Override
    public String getXPathSearchExpression(final String s) {
        return tag.getXPathSearchExpression(s);
    }

    @Override
    public String getGQLSearchExpression(final String s) {
        return tag.getGQLSearchExpression(s);
    }

    @Override
    public String getName() {
        return tag.getName();
    }

    @Override
    public String getTagID() {
        return tag.getTagID();
    }

    @Override
    public String getLocalTagID() {
        return tag.getLocalTagID();
    }

    @Override
    public String getPath() {
        return tag.getPath();
    }

    private String getLocalizedTitle(final Locale locale, final boolean fallback) {
        final String language = locale.getLanguage();

        String localizedTitle = null;

        if (language.length() == 0) {
            localizedTitle = fallback ? getTitle() : null;
        } else {
            if (locale.getCountry().length() > 0) {
                localizedTitle = properties.get(getLocalizedTitlePropertyName(locale), String.class);
            }

            if (localizedTitle == null) {
                localizedTitle = properties.get(getLocalizedTitlePropertyName(new Locale(language)), String.class);
            }

            if (localizedTitle == null) {
                localizedTitle = fallback ? getTitle() : null;
            }
        }

        return localizedTitle;
    }

    private String getLocalizedTitlePropertyName(final Locale locale) {
        return JcrConstants.JCR_TITLE + "." + locale.toString().toLowerCase();
    }
}
