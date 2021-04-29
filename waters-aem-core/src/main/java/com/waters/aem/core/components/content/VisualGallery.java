package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.brightcove.BrightcoveService;
import com.waters.aem.core.servlets.ResizeImageServlet;
import com.waters.aem.core.utils.AssetUtils;
import com.waters.aem.core.utils.BrightcoveUtils;

@Component(value = "Visual Gallery",
	description = "This is the Visual Gallery component for Waters site",
    listeners = {
		@Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)
    },
	tabs = {
		@Tab(title = "Images"),
		@Tab(title = "Videos")
	})
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { VisualGallery.class, ComponentExporter.class },
    resourceType = VisualGallery.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public final class VisualGallery implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/visualgallery";
	
	public String[] tabs = {"Images", "Videos"};
	
	 private static final ObjectMapper MAPPER = new ObjectMapper();
	
	 private static final String SRC_URI_TEMPLATE_WIDTH = "{{width}}";

	@OSGiService
	private BrightcoveService brightcoveService;

	@Self
	private SiteContext siteContext;

	@Inject
	private Resource resource;

	@ScriptVariable
	private Style currentStyle;


	@DialogField(fieldLabel = "Images",
			fieldDescription = "Select Images to be displayed",
			renderReadOnly = false,
			tab = 1,
			ranking = 1)
	@MultiField
	@PathField(rootPath = WatersConstants.DAM_PATH)
	@Inject
	private String[] images = new String[0];


	@DialogField(fieldLabel = "Video ID",
			fieldDescription = "Enter Brightcove Video ID that needs to be displayed in the video gallery",
			tab = 2,
			ranking = 1)
	@MultiField
	@TextField
	@Inject
	private String[] videoIds = new String[0];


	public String getImageGalleryAsJson() throws JsonProcessingException {
		final Map<String, Object> jsonMap = new HashMap<>();
		jsonMap.put("images", getAssetsList());
		jsonMap.put("widths", getWidths());
		jsonMap.put("videoIds", getVideoIds());
		jsonMap.put("brightcoveAccount", getBrightcoveAccount());
		jsonMap.put("brightcovePlayerId", getBrightcovePlayerId());
		jsonMap.put("tabs", getTabs());

		return MAPPER.writeValueAsString(jsonMap);
	}

	private List<Map<String, String>> getAssetsList() {

		List<Map<String, String>> assetsList = null;

		if (images.length != 0) {
			assetsList = new ArrayList<>();
			for (String image : images) {
				Map<String, String> imageMap = new HashMap<>();
				Asset asset = AssetUtils.getAsset(resource.getResourceResolver(), image);
				String alt = AssetUtils.getAltText(asset);
				//In Build URI method also we are doing this in case of false
				imageMap.put("src", buildUri(asset, true));		
				imageMap.put("title", asset.getMetadataValue(DamConstants.DC_TITLE) == null ? StringUtils.EMPTY
						: asset.getMetadataValue(DamConstants.DC_TITLE));
				imageMap.put("alt", alt == null ? StringUtils.EMPTY : alt);	
				imageMap.put("description",
						asset.getMetadataValue(DamConstants.DC_DESCRIPTION) == null ? StringUtils.EMPTY
								: asset.getMetadataValue(DamConstants.DC_DESCRIPTION));

				assetsList.add(imageMap);
			}

			return assetsList.stream().filter(Objects::nonNull).collect(Collectors.toList());
		}else {
			return assetsList;
		}
	}

	private List<String> getWidths() {
		return Arrays.asList(currentStyle.get(Image.PN_DESIGN_ALLOWED_RENDITION_WIDTHS, new String[0]));
	}
	
    private String buildUri(final Asset asset, final boolean template) {
        final StringBuilder builder = new StringBuilder();

        // append the DAM asset path
        builder.append(asset.getPath());

        if (template) {
            builder.append(".");

            // width selector
            builder.append(SRC_URI_TEMPLATE_WIDTH);
            builder.append(".");

            // 'resize' extension to resolve the resize image servlet
            builder.append(ResizeImageServlet.RESIZE_EXTENSION);
            builder.append("/");
            builder.append(ResizeImageServlet.SUFFIX_NAME);
            builder.append(".");

            // add the extension derived from DAM asset name
            builder.append(FilenameUtils.getExtension(asset.getName()));
        }

        return builder.toString();
    }

	public String[] getVideoIds() {
		return videoIds;
	}
	
	public String[] getTabs() {
		return tabs;
	}

	public String getBrightcoveAccount() {
		return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
	}

	public String getBrightcovePlayerId() {
		return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
	}
	
	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}