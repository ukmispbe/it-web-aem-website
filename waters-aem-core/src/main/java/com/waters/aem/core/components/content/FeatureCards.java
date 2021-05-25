package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import java.util.List;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.RichTextEditor;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.citytechinc.cq.component.annotations.widgets.ToolbarConfig;
import com.citytechinc.cq.component.annotations.widgets.rte.Format;
import com.citytechinc.cq.component.annotations.widgets.rte.SubSuperscript;
import com.citytechinc.cq.component.annotations.widgets.rte.UISettings;
import com.day.cq.wcm.api.designer.Style;

@Component(value = "Feature Card", description = "This is the Feature Cards component for Waters site.", listeners = {
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),		
		@Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) }, tabs = { @Tab(title = "Properties") })
@Model(adaptables = SlingHttpServletRequest.class, adapters = { FeatureCards.class,
		ComponentExporter.class }, resourceType = FeatureCards.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public final class FeatureCards implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/featurecards";

	@ScriptVariable
	private Style currentStyle;

	@DialogField(fieldLabel = "Title", fieldDescription = "Enter the Title for the Feature Card")
	@TextField
	@Inject
	private String title;

	@DialogField(fieldLabel = "Description", fieldDescription = "Enter the Description for the Feature Card")
	@RichTextEditor(
	        format = @Format(underline = false),
	        subsuperscript = @SubSuperscript,
	        uiSettings = @UISettings(
	            inline = @ToolbarConfig(toolbars = {
	                ToolbarConfig.FORMAT_BOLD,
	                ToolbarConfig.FORMAT_ITALIC,
	                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
	                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT
	            }),
	            fullscreen = @ToolbarConfig(toolbars = {
	                ToolbarConfig.FORMAT_BOLD,
	                ToolbarConfig.FORMAT_ITALIC,
	                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
	                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT,
	                ToolbarConfig.JUSTIFY_JUSITFYLEFT,
	                ToolbarConfig.JUSTIFY_JUSITFYCENTER,
	                ToolbarConfig.JUSTIFY_JUSITFYRIGHT
	            })
	        )
	    )
	@Inject
	private String description;

	@DialogField(fieldLabel = "Features",
	        fieldDescription = "Enter Feature details"
	        )
    @MultiField(composite = true)
    @Inject
    private List<FeatureCard> features;
	
	public List<FeatureCard> getFeatures() {
		return features;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}