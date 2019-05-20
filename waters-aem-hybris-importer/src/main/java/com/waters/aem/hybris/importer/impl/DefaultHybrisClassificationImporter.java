package com.waters.aem.hybris.importer.impl;

import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.google.common.base.Stopwatch;
import com.waters.aem.core.utils.TextUtils;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisClassificationImporter;
import com.waters.aem.hybris.models.Classification;
import com.waters.aem.hybris.models.Feature;
import com.waters.aem.hybris.models.FeatureUnitValue;
import com.waters.aem.hybris.models.FeatureValue;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component(service = HybrisClassificationImporter.class)
public final class DefaultHybrisClassificationImporter implements HybrisClassificationImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisClassificationImporter.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Override
    public List<HybrisImporterResult> importClassificationTags(final Product product) {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);

            results.addAll(importClassificationTagsForProduct(tagManager, product));
        } catch (LoginException | InvalidTagFormatException e) {
            LOG.error("error importing classification tags for product : " + product.getCode(), e);

            throw new HybrisImporterException(e);
        }

        LOG.info("imported {} classification tags in {}ms", results.size(), stopwatch.elapsed(TimeUnit.MILLISECONDS));

        return results;
    }

    private List<HybrisImporterResult> importClassificationTagsForProduct(final TagManager tagManager,
        final Product product) throws InvalidTagFormatException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Tag rootClassificationTag = tagManager.resolve("/etc/tags/waters/classifications");

        for (final Classification classification : product.getClassifications()) {
            final String classificationTagName = TextUtils.getValidJcrName(classification.getCode());

            final HybrisImporterResult classificationTagResult = getOrCreateTag(tagManager, rootClassificationTag,
                classificationTagName, classification.getName());

            results.add(classificationTagResult);

            final Tag classificationTag = tagManager.resolve(classificationTagResult.getPath());

            for (final Feature feature : classification.getFeatures()) {
                final String featureTitle = getFeatureTitle(feature);
                final String featureTagName = TextUtils.getValidJcrName(featureTitle);

                final HybrisImporterResult featureTagResult = getOrCreateTag(tagManager, classificationTag,
                    featureTagName, featureTitle);

                results.add(featureTagResult);

                final Tag featureTag = tagManager.resolve(featureTagResult.getPath());

                for (final FeatureValue featureValue : feature.getFeatureValues()) {
                    final String valueWithUnits = getValueWithUnits(featureValue);

                    final String featureValueTagName = TextUtils.getValidJcrName(valueWithUnits);

                    final HybrisImporterResult featureValueTagResult = getOrCreateTag(tagManager, featureTag,
                        featureValueTagName, valueWithUnits);

                    results.add(featureValueTagResult);
                }
            }
        }

        return results;
    }

    private HybrisImporterResult getOrCreateTag(final TagManager tagManager, final Tag parentTag, final String name,
        final String title) throws InvalidTagFormatException {
        Tag tag = tagManager.resolve(parentTag.getPath() + "/" + name);

        final HybrisImportStatus status;

        if (tag == null) {
            tag = tagManager.createTag(parentTag.getPath() + "/" + name, title, null);

            LOG.info("created new tag : {}", tag.getTagID());

            status = HybrisImportStatus.CREATED;
        } else {
            LOG.debug("found existing tag : {}", tag.getTagID());

            status = HybrisImportStatus.IGNORED;
        }

        return HybrisImporterResult.fromTag(tag, status);
    }

    private String getFeatureTitle(final Feature feature) {
        return Optional.ofNullable(feature.getPublicWebLabel()).orElse(feature.getName());
    }

    private String getValueWithUnits(final FeatureValue featureValue) {
        final StringBuilder builder = new StringBuilder(featureValue.getValue());

        final FeatureUnitValue featureUnitValue = featureValue.getFeatureUnitValue();

        if (featureUnitValue != null) {
            builder.append(featureUnitValue.getValue());
        }

        return builder.toString();
    }
}
