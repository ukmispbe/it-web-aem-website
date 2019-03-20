package com.waters.aem.core.tagging;

import com.day.cq.commons.RangeIterator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagException;
import com.day.cq.tagging.TagManager;
import com.google.common.collect.Iterators;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Session;
import java.security.AccessControlException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@SuppressWarnings("squid:S1196")
public final class WatersTagManager implements TagManager {

    private final TagManager tagManager;

    WatersTagManager(final TagManager tagManager) {
        this.tagManager = tagManager;
    }

    @Override
    public Tag resolve(final String tagId) {
        return Optional.ofNullable(tagManager.resolve(tagId))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag resolveByTitle(final String tagTitlePath) {
        return Optional.ofNullable(tagManager.resolveByTitle(tagTitlePath))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag resolveByTitle(final String tagTitlePath, final Locale locale) {
        return Optional.ofNullable(tagManager.resolveByTitle(tagTitlePath, locale))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public boolean canCreateTag(final String tagId) throws InvalidTagFormatException {
        return tagManager.canCreateTag(tagId);
    }

    @Override
    public boolean canCreateTagByTitle(final String titlePath) throws InvalidTagFormatException {
        return tagManager.canCreateTagByTitle(titlePath);
    }

    @Override
    public boolean canCreateTagByTitle(final String titlePath, final Locale locale) throws InvalidTagFormatException {
        return tagManager.canCreateTagByTitle(titlePath, locale);
    }

    @Override
    public Tag createTag(final String tagId, final String title, final String description)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTag(tagId, title, description))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTag(final String tagId, final String title, final String description, final boolean autoSave)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTag(tagId, title, description, autoSave))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTagByTitle(final String titlePath) throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTagByTitle(titlePath))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTagByTitle(final String titlePath, final boolean autoSave)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTagByTitle(titlePath, autoSave))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTagByTitle(final String titlePath, final Locale locale)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTagByTitle(titlePath, locale))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public void deleteTag(final Tag tag) throws AccessControlException {
        tagManager.deleteTag(tag);
    }

    @Override
    public void deleteTag(final Tag tag, final boolean autoSave) throws AccessControlException {
        tagManager.deleteTag(tag, autoSave);
    }

    @Override
    public RangeIterator<Resource> find(final String tagId) {
        return tagManager.find(tagId);
    }

    @Override
    public FindResults findByTitle(final String title) {
        return tagManager.findByTitle(title);
    }

    @Override
    public Tag[] findTagsByTitle(final String title, final Locale locale) {
        return Arrays.stream(tagManager.findTagsByTitle(title, locale))
            .map(WatersTag ::new)
            .toArray(Tag[] ::new);
    }

    @Override
    public RangeIterator<Resource> find(final String basePath, final String[] tagIds) {
        return tagManager.find(basePath, tagIds);
    }

    @Override
    public RangeIterator<Resource> find(final String basePath, final String[] tagIds, final boolean oneMatchIsEnough) {
        return tagManager.find(basePath, tagIds, oneMatchIsEnough);
    }

    @Override
    public RangeIterator<Resource> find(final String basePath, final List<String[]> tagIds) {
        return tagManager.find(basePath, tagIds);
    }

    @Override
    public Tag[] getNamespaces() {
        return Arrays.stream(tagManager.getNamespaces())
            .map(WatersTag ::new)
            .toArray(Tag[] ::new);
    }

    @Override
    public Iterator<Tag> getNamespacesIter() {
        return Iterators.transform(tagManager.getNamespacesIter(), WatersTag ::new);
    }

    @Override
    public Tag[] getTags(final Resource resource) {
        return Arrays.stream(tagManager.getTags(resource))
            .map(WatersTag ::new)
            .toArray(Tag[] ::new);
    }

    @Override
    public void setTags(final Resource resource, final Tag[] tags) {
        tagManager.setTags(resource, tags);
    }

    @Override
    public void setTags(final Resource resource, final Tag[] tags, final boolean autoSave) {
        tagManager.setTags(resource, tags, autoSave);
    }

    @Override
    public Tag[] getTagsForSubtree(final Resource resource, final boolean shallow) {
        return Arrays.stream(tagManager.getTagsForSubtree(resource, shallow))
            .map(WatersTag ::new)
            .toArray(Tag[] ::new);
    }

    @Override
    @Deprecated
    public Session getSession() {
        return tagManager.getSession();
    }

    @Override
    public ResourceResolver getResourceResolver() {
        return tagManager.getResourceResolver();
    }

    @Override
    public Tag moveTag(final Tag tag, final String destination)
        throws AccessControlException, InvalidTagFormatException, TagException {
        return new WatersTag(tagManager.moveTag(tag, destination));
    }

    @Override
    public void mergeTag(final Tag tag, final Tag destination) throws AccessControlException, TagException {
        tagManager.mergeTag(tag, destination);
    }
}
