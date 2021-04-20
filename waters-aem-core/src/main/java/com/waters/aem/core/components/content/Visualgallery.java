package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.inject.Inject;

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
import com.waters.aem.core.utils.AssetUtils;
import com.waters.aem.core.utils.BrightcoveUtils;

@Component(value = "Visual Gallery",
    listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    },
        tabs = {
                @Tab(title = "Images"),
                @Tab(title = "Videos")
        }
    )
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Visualgallery.class, ComponentExporter.class },
    resourceType = Visualgallery.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Visualgallery implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/visualgallery";

	private static final ObjectMapper MAPPER = new ObjectMapper();

//	private static final String SRC_URI_TEMPLATE_WIDTH = "{{width}}";

	@OSGiService
	private BrightcoveService brightcoveService;

	@Self
	private SiteContext siteContext;

	@Inject
	private Resource resource;

	@ScriptVariable
	private Style currentStyle;

	@MultiField
	@DialogField(fieldLabel = "Images", fieldDescription = "Images to be displayed", renderReadOnly = false, tab = 1, ranking = 1)
	@PathField(rootPath = WatersConstants.DAM_PATH)
	@Inject
	private String[] images = new String[0];

	@MultiField
	@DialogField(fieldLabel = "Video ID", fieldDescription = "Enter the Brightcover Video ID", tab = 2, ranking = 1)
	@TextField
	@Inject
	private String[] videoIds = new String[0];

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

	public String[] getVideoIds() {
		return videoIds;
	}

	public String getJson() throws JsonProcessingException {
		final Map<String, Object> json = new HashMap<>();

		json.put("images", getAssets());
		json.put("widths", getWidths());
		json.put("videoIds", getVideoIds());
		json.put("brightcoveAccount", getBrightcoveAccount());
		json.put("brightcovePlayerId", getBrightcovePlayerId());

		return MAPPER.writeValueAsString(json);
	}

	private List<Map<String, String>> getAssets() {

		List<Map<String, String>> assets = new ArrayList<>();

		for (String image : images) {
			Map<String, String> imageMap = new HashMap<>();
			Asset asset = AssetUtils.getAsset(resource.getResourceResolver(), image);

			String alt = AssetUtils.getAltText(asset);
			imageMap.put("src", image);
			//imageMap.put("asset", asset);
			imageMap.put("alt", alt);
			imageMap.put("description", asset.getMetadataValue(DamConstants.DC_DESCRIPTION));
			assets.add(imageMap);
		}

		return assets.stream().filter(Objects::nonNull).collect(Collectors.toList());
	}

	private List<String> getWidths() {
		return Arrays.asList(currentStyle.get(Image.PN_DESIGN_ALLOWED_RENDITION_WIDTHS, new String[0]));
	}

	public String getBrightcoveAccount() {
		return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
	}

	public String getBrightcovePlayerId() {
		return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
	}

}