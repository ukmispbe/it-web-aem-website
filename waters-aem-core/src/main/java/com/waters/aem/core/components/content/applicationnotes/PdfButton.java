package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.commons.Externalizer;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.settings.SlingSettingsService;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "PDF Button",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { PdfButton.class, ComponentExporter.class },
    resourceType = PdfButton.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class PdfButton implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/pdfbutton";

    @OSGiService
    private SlingSettingsService settingsService;

    @Inject
    private PageDecorator currentPage;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public String getPdfAssetPath() {
        final String pdfAssetPath;

        if (settingsService.getRunModes().contains(Externalizer.PUBLISH)) {
            // link directly to DAM asset
            pdfAssetPath = currentPage.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();
        } else {
            // link to page servlet to generate asset dynamically (author mode only)
            pdfAssetPath = currentPage.getLinkBuilder()
                .setExtension(WatersConstants.EXTENSION_PDF)
                .build()
                .getHref();
        }

        return pdfAssetPath;
    }
}
