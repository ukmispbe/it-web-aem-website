package com.waters.aem.core.utils;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.Optional;

public final class AssetUtils {

    /**
     * Given a resource resolver and a file reference, attempt to get the Asset object this file reference represents.
     *
     * @param resourceResolver used to lookup the Asset object
     * @param fileReference the path to the DAM asset
     * @return the Asset or null if the asset is not found.
     */
    public static Asset getAsset(final ResourceResolver resourceResolver, final String fileReference) {
        final Resource assetResource = resourceResolver.getResource(fileReference);

        return assetResource == null ? null : assetResource.adaptTo(Asset.class);
    }

    /**
     * Given a DAM asset, first check the metadata description and use that as the alt text or else get it from the asset's title.
     *
     *  @param asset the asset to extract the alt text from
     * @return the alt text of the DAM asset
     */
    public static String getAltText(final Asset asset) {
        return Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_DESCRIPTION))
                .orElse(asset.getMetadataValue(DamConstants.DC_TITLE));
    }

    private AssetUtils() {

    }
}
