package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

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
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.RichTextEditor;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.citytechinc.cq.component.annotations.widgets.ToolbarConfig;
import com.citytechinc.cq.component.annotations.widgets.rte.Format;
import com.citytechinc.cq.component.annotations.widgets.rte.SubSuperscript;
import com.citytechinc.cq.component.annotations.widgets.rte.UISettings;
import com.day.cq.wcm.api.designer.Style;
import com.waters.aem.core.constants.WatersConstants;

@Component(value = "FeatureCard", description = "This is the Feature Card component for Waters site.", listeners = {
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),		
		@Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) }, tabs = { @Tab(title = "Properties") })
@Model(adaptables = SlingHttpServletRequest.class, adapters = { FeatureCard.class,
		ComponentExporter.class }, resourceType = FeatureCard.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public final class FeatureCard implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/featurecard";

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

	@DialogField(fieldLabel = "Icon", fieldDescription = "Select the icon to be added for this feature", required = true)
	@MultiField
	@PathField(rootPath = WatersConstants.DAM_PATH)
	@Inject
	private String[] icon;
	
	@DialogField(fieldLabel = "Feature", fieldDescription = "Enter the Feature")
	@MultiField
	@TextField
	@Inject
	private String[] feature;

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String[] getIcon() {
		return icon;
	}

	public String[] getFeature() {
		return feature;
	}
	
	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}