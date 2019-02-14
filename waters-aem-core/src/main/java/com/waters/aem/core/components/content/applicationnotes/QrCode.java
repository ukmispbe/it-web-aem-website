package com.waters.aem.core.components.content.applicationnotes;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.commons.Externalizer;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

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

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resourceResolver;

    @OSGiService
    private Externalizer externalizer;

    public String getImageSource() {
        final String externalizedPageUrl = externalizer.externalLink(resourceResolver, Externalizer.PUBLISH,
            currentPage.getHref());

        return LinkBuilderFactory.forPath("/libs/wcm/mobile/qrcode.png")
            .addParameter("url", externalizedPageUrl)
            .build()
            .getHref();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
