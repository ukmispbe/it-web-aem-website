package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.NumberField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.constants.WatersConstants;

@Component(value = "Resources", description = "This component Displays list of resources",
        listeners = {
                @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
                @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)},
        tabs = {@Tab(title = "Knowledge Resources")})
@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {Resources.class,
        ComponentExporter.class},
        resourceType = Resources.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Resources implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/resources";

    @DialogField(fieldLabel = "Title",
            fieldDescription = "Enter the Title for the List",
            required = true)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Build List Using",
            fieldDescription = "Build Resources List using Tags or Fixed Id",
            required = true)
    @Selection(type = Selection.SELECT,
            options = {@Option(text = "Tags",
                    value = "Tags"),
            @Option(text = "Document Number",
                    value = "docNumber"),})
    @Inject
    private String listType;

    @DialogField(fieldLabel = "Content Type",
            fieldDescription = "Select the Content Type",
            required = true)
    @TagInputField(rootPath = WatersConstants.TAG_CONTENT_TYPE_PATH)
    @Inject
    private String contentType;

    @DialogField(fieldLabel = "Tags",
            fieldDescription = "Selects the Tags")
    @TagInputField(rootPath = WatersConstants.TAG_ROOT_PATH)
    @Inject
    private String tags;

    @DialogField(fieldLabel = "Max Items",
            fieldDescription = "Maximum Numbers of Items displayed in the list")
    @NumberField
    @Inject
    private String maxItems;

    @DialogField(fieldLabel = "ID",
            fieldDescription = "HTML Id attribute to enter to this component")
    @TextField
    @Inject
    private String id;

    @DialogField(fieldLabel = "Document Number",
            fieldDescription = "Enter the Support Document partnumber")
    @MultiField
    @TextField
    @Inject
    private String[] docNumber;

    public String getTitle() {
        return title;
    }

    public String getListType() {
        return listType;
    }

    public String getContentType() {
        return contentType;
    }

    public String getTags() {
        return tags;
    }

    public String getMaxItems() {
        if (StringUtils.isEmpty(maxItems)) {
            maxItems = "5";
        }
        return maxItems;
    }

    public String getId() {
        return id;
    }

    public String[] getDocNumber() {
        return docNumber;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}