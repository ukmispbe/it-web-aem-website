package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.commons.Externalizer;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "QR Code",
    path = WatersConstants.COMPONENT_PATH_APPLICATION_NOTES)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { QrCode.class, ComponentExporter.class },
    resourceType = QrCode.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class QrCode implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/applicationnotes/qrcode";

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resourceResolver;

    @OSGiService
    private Externalizer externalizer;

    private String externalizedPageUrl;

    public String getExternalizedPageUrl() {
        if (externalizedPageUrl == null) {
            final ApplicationNotes applicationNotes = currentPage.getContentResource().adaptTo(ApplicationNotes.class);

            externalizedPageUrl = externalizer.externalLink(resourceResolver, Externalizer.PUBLISH,
                "/" + applicationNotes.getLiteratureCode());
        }

        return externalizedPageUrl;
    }

    public String getText() {
        return siteContext.getTranslation("Visit <a href=\"{0}\">{0}</a> to read this application note online.",
            "{0} = externalized page URL", getExternalizedPageUrl());
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
