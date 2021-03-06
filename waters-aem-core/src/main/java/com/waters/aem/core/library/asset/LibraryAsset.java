package com.waters.aem.core.library.asset;

import com.day.cq.commons.LanguageUtil;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.dam.api.Rendition;
import com.day.cq.dam.api.RenditionPicker;
import com.day.cq.dam.api.Revision;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.NameConstants;
import com.google.common.base.Objects;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.tagging.WatersTagInject;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ChildResource;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.Binary;
import javax.jcr.RepositoryException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Model for Waters library assets containing classification metadata.
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@SuppressWarnings({ "common-java:DuplicatedBlocks" })
public final class LibraryAsset implements ContentClassification, Asset {

    private static final String RELATIVE_PATH_METADATA = "jcr:content/metadata";

    private static final Map<String, String> METADATA_PROPERTIES = new ImmutableMap.Builder<String, String>()
        .put(DamConstants.DC_TITLE, NameConstants.PN_PAGE_TITLE)
        .put(DamConstants.DC_DESCRIPTION, NameConstants.PN_DESCRIPTION)
        .build();

    @Self
    @Required
    private Asset asset;

    @org.apache.sling.models.annotations.injectorspecific.ChildResource(name = RELATIVE_PATH_METADATA)
    private Resource metadata;

    @Inject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private String literatureCode;

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> category = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> contentType = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> product = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> market = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> instrumentTechnique = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> separationMode = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> compoundAnalyte = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> event = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> monthPublished = Collections.emptyList();

    @WatersTagInject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    private List<Tag> yearPublished = Collections.emptyList();

    @Inject
    @Via(value = RELATIVE_PATH_METADATA, type = ChildResource.class)
    @Named(DamConstants.DC_LANGUAGE)
    private String languageCode;

    @Override
    public String getLiteratureCode() {
        return literatureCode;
    }

    @Override
    public List<Tag> getCategory() {
        return category;
    }

    @Override
    public List<Tag> getContentType() {
        return contentType;
    }

    @Override
    public List<Tag> getMonthPublished() {
        return monthPublished;
    }

    @Override
    public List<Tag> getYearPublished() {
        return yearPublished;
    }

    @Override
    public List<Tag> getMarket() {
        return market;
    }

    @Override
    public List<Tag> getInstrumentTechnique() {
        return instrumentTechnique;
    }

    @Override
    public List<Tag> getSeparationMode() {
        return separationMode;
    }

    @Override
    public List<Tag> getCompoundAnalyte() {
        return compoundAnalyte;
    }

    public List<Tag> getProduct() {
        return product;
    }

    public List<Tag> getEvent() {
        return event;
    }

    @Override
    public List<Tag> getAllTags() {
        return new ImmutableList.Builder<Tag>()
            .addAll(category)
            .addAll(contentType)
            .addAll(product)
            .addAll(market)
            .addAll(yearPublished)
            .addAll(separationMode)
            .addAll(compoundAnalyte)
            .addAll(instrumentTechnique)
            .addAll(event)
            .build();
    }

    public String getTitle() {
        return getMetadataValue(DamConstants.DC_TITLE);
    }

    public Locale getLocale() {
        return languageCode == null ? Locale.getDefault() : LanguageUtil.getLocale(languageCode);
    }

    /**
     * Get a map of library metadata properties.
     *
     * @return properties map
     */
    public Map<String, Object> getProperties() {
        return metadata.getValueMap()
            .entrySet()
            .stream()
            .filter(entry -> METADATA_PROPERTIES.keySet().contains(entry.getKey()))
            .collect(Collectors.toMap(entry -> METADATA_PROPERTIES.get(entry.getKey()), Map.Entry :: getValue));
    }

    /**
     * Check if this asset is tagged as a library asset.
     *
     * @return true if tagged with library category tag
     */
    public boolean isLibraryAsset() {
        return category.stream().anyMatch(tag -> WatersConstants.TAG_LIBRARY.equals(tag.getTagID()));
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("path", getPath())
            .add("title", getTitle())
            .add("category", category.stream().map(Tag :: getTitle).collect(Collectors.toList()))
            .add("literatureCode", literatureCode)
            .toString();
    }

    // asset delegate methods

    @Override
    public String getPath() {
        return asset.getPath();
    }

    @Override
    public String getName() {
        return asset.getName();
    }

    @Override
    public String getMetadataValue(final String name) {
        return asset.getMetadataValue(name);
    }

    @Override
    public Object getMetadata(final String name) {
        return asset.getMetadata(name);
    }

    @Override
    public long getLastModified() {
        return asset.getLastModified();
    }

    @Override
    public Rendition getRendition(final String name) {
        return asset.getRendition(name);
    }

    @Override
    public Rendition getImagePreviewRendition() {
        return asset.getImagePreviewRendition();
    }

    @Override
    public Rendition getOriginal() {
        return asset.getOriginal();
    }

    @Override
    @Deprecated
    @SuppressWarnings({ "squid:MissingDeprecatedCheck", "squid:S1133" })
    public Rendition getCurrentOriginal() {
        return asset.getCurrentOriginal();
    }

    @Override
    public boolean isSubAsset() {
        return asset.isSubAsset();
    }

    @Override
    public Map<String, Object> getMetadata() {
        return asset.getMetadata();
    }

    @Override
    @Deprecated
    @SuppressWarnings({ "squid:MissingDeprecatedCheck", "squid:S1133" })
    public Resource setRendition(final String name, final InputStream is, final String mimeType) {
        return asset.setRendition(name, is, mimeType);
    }

    @Override
    @Deprecated
    @SuppressWarnings({ "squid:MissingDeprecatedCheck", "squid:S1133" })
    public void setCurrentOriginal(final String name) {
        asset.setCurrentOriginal(name);
    }

    @Override
    public Revision createRevision(final String label, final String comment) throws Exception {
        return asset.createRevision(label, comment);
    }

    @Override
    public Revision createRevision(String s, String s1, User user) throws Exception {
        return null;
    }

    @Override
    public List<Rendition> getRenditions() {
        return asset.getRenditions();
    }

    @Override
    public Iterator<Rendition> listRenditions() {
        return asset.listRenditions();
    }

    @Override
    public Rendition getRendition(final RenditionPicker picker) {
        return asset.getRendition(picker);
    }

    @Override
    public String getModifier() {
        return asset.getModifier();
    }

    @Override
    public Asset restore(final String revisionId) throws Exception {
        return asset.restore(revisionId);
    }

    @Override
    public Collection<Revision> getRevisions(final Calendar cal) throws Exception {
        return asset.getRevisions(cal);
    }

    @Override
    public String getMimeType() {
        return asset.getMimeType();
    }

    @Override
    public Rendition addRendition(final String name, final InputStream is, final String mimeType) {
        return asset.addRendition(name, is, mimeType);
    }

    @Override
    public Rendition addRendition(final String name, final InputStream is, final Map<String, Object> map) {
        return asset.addRendition(name, is, map);
    }

    @Override
    public Rendition addRendition(String s, Binary binary, String s1) {
        return null;
    }

    @Override
    public Rendition addRendition(String s, Binary binary, Map<String, Object> map) {
        return null;
    }

    @Override
    public Asset addSubAsset(final String name, final String mimeType, final InputStream stream) {
        return asset.addSubAsset(name, mimeType, stream);
    }

    @Override
    public Collection<Asset> getSubAssets() {
        return asset.getSubAssets();
    }

    @Override
    public void removeRendition(final String name) {
        asset.removeRendition(name);
    }

    @Override
    public void setBatchMode(final boolean mode) {
        asset.setBatchMode(mode);
    }

    @Override
    public boolean isBatchMode() {
        return asset.isBatchMode();
    }

    @Override
    public String getMetadataValueFromJcr(final String name) {
        return asset.getMetadataValueFromJcr(name);
    }

    @Override
    public String getID() {
        return asset.getID();
    }

    @Override
    public void initAssetState() throws RepositoryException {
        asset.initAssetState();
    }

    @Override
    @CheckForNull
    public <T> T adaptTo(@Nonnull final Class<T> type) {
        return asset.adaptTo(type);
    }
}