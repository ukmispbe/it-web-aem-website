package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.utils.LinkUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "External List",
    description = "This is the External List component for Waters site",
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ExternalList.class, ComponentExporter.class },
    resourceType = ExternalList.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ExternalList implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/externallist";

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Enter the Title for the External List",
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Description",
        fieldDescription = "Enter the Description for the External List",
        ranking = 2)
    @TextField
    @Inject
    private String description;

    @DialogField(fieldLabel = "Link Item Text",
        fieldDescription = "Enter the text for the link",
        ranking = 3)
    @TextField
    @Inject
    private String text;

    @DialogField(fieldLabel = "Link Item URL",
        fieldDescription = "Select or enter the link URL",
        required = true,
        ranking = 4)
    @PathField(rootPath = PathConstants.PATH_CONTENT)
    @LinkInject
    private Link link;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getText() {
        return text;
    }

    public Link getLink() {
        return link;
    }

    public Boolean isExternal() {
        return LinkUtils.isExternal(link);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
