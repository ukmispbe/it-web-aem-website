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

public final class WatersTagManager implements TagManager {

    private final TagManager tagManager;

    WatersTagManager(final TagManager tagManager) {
        this.tagManager = tagManager;
    }

    @Override
    public Tag resolve(final String s) {
        return Optional.ofNullable(tagManager.resolve(s))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag resolveByTitle(final String s) {
        return Optional.ofNullable(tagManager.resolveByTitle(s))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag resolveByTitle(final String s, final Locale locale) {
        return Optional.ofNullable(tagManager.resolveByTitle(s, locale))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public boolean canCreateTag(final String s) throws InvalidTagFormatException {
        return tagManager.canCreateTag(s);
    }

    @Override
    public boolean canCreateTagByTitle(final String s) throws InvalidTagFormatException {
        return tagManager.canCreateTagByTitle(s);
    }

    @Override
    public boolean canCreateTagByTitle(final String s, final Locale locale) throws InvalidTagFormatException {
        return tagManager.canCreateTagByTitle(s, locale);
    }

    @Override
    public Tag createTag(final String s, final String s1, final String s2)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTag(s, s1, s2))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTag(final String s, final String s1, final String s2, final boolean b)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTag(s, s1, s2, b))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTagByTitle(final String s) throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTagByTitle(s))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTagByTitle(final String s, final boolean b)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTagByTitle(s, b))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public Tag createTagByTitle(final String s, final Locale locale)
        throws AccessControlException, InvalidTagFormatException {
        return Optional.ofNullable(tagManager.createTagByTitle(s, locale))
            .map(WatersTag ::new)
            .orElse(null);
    }

    @Override
    public void deleteTag(final Tag tag) throws AccessControlException {
        tagManager.deleteTag(tag);
    }

    @Override
    public void deleteTag(final Tag tag, final boolean b) throws AccessControlException {
        tagManager.deleteTag(tag, b);
    }

    @Override
    public RangeIterator<Resource> find(final String s) {
        return tagManager.find(s);
    }

    @Override
    public FindResults findByTitle(final String s) {
        return tagManager.findByTitle(s);
    }

    @Override
    public Tag[] findTagsByTitle(final String s, final Locale locale) {
        return Arrays.stream(tagManager.findTagsByTitle(s, locale))
            .map(WatersTag ::new)
            .toArray(Tag[] ::new);
    }

    @Override
    public RangeIterator<Resource> find(final String s, final String[] strings) {
        return tagManager.find(s, strings);
    }

    @Override
    public RangeIterator<Resource> find(final String s, final String[] strings, final boolean b) {
        return tagManager.find(s, strings, b);
    }

    @Override
    public RangeIterator<Resource> find(final String s, final List<String[]> list) {
        return tagManager.find(s, list);
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
    public void setTags(final Resource resource, final Tag[] tags, final boolean b) {
        tagManager.setTags(resource, tags, b);
    }

    @Override
    public Tag[] getTagsForSubtree(final Resource resource, final boolean b) {
        return Arrays.stream(tagManager.getTagsForSubtree(resource, b))
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
    public Tag moveTag(final Tag tag, final String s)
        throws AccessControlException, InvalidTagFormatException, TagException {
        return new WatersTag(tagManager.moveTag(tag, s));
    }

    @Override
    public void mergeTag(final Tag tag, final Tag tag1) throws AccessControlException, TagException {
        tagManager.mergeTag(tag, tag1);
    }
}
