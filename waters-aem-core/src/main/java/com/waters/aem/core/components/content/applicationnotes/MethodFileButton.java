package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.DamUtil;
import com.google.common.collect.Iterators;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Iterator;

@Component(value = "Method File Button",
    description = "This is the MethodFileButton component for Waters site",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { MethodFileButton.class, ComponentExporter.class },
    resourceType = MethodFileButton.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class MethodFileButton implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/methodfilebutton";

    private static final Logger LOG = LoggerFactory.getLogger(MethodFileButton.class);

    private static final String METHOD_FOLDER_RELATIVE_PATH = "/method";

    private static final String EXTENSION_ZIP = ".zip";

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resourceResolver;

    public String getMethodFilePath() {
        final ApplicationNotes applicationNotes = currentPage.getContentResource().adaptTo(ApplicationNotes.class);

        final String assetFolderPath = applicationNotes.getAssetFolderPath();

        String methodFilePath = null;

        if (assetFolderPath == null) {
            LOG.debug("asset folder does not exist for page : {}", currentPage.getPath());
        } else {
            final String methodFileFolderPath = assetFolderPath + METHOD_FOLDER_RELATIVE_PATH;
            final Resource methodFileFolderResource = resourceResolver.getResource(methodFileFolderPath);

            if (methodFileFolderResource == null) {
                LOG.debug("method file folder does not exist for path : {}", methodFileFolderPath);
            } else {
                final Iterator<Asset> assets = DamUtil.getAssets(methodFileFolderResource);

                methodFilePath = Iterators.tryFind(assets, asset -> asset.getName().endsWith(EXTENSION_ZIP))
                    .transform(Asset :: getPath)
                    .orNull();

                LOG.debug("found method file path : {}", methodFilePath);
            }
        }

        return methodFilePath;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
