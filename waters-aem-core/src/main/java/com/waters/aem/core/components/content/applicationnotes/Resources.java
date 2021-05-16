package com.waters.aem.core.components.content.applicationnotes;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.util.Text;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

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
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;

@Component(value = "Resources", description = "This component Displays list of resources", listeners = {
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) }, tabs = {
				@Tab(title = "Knowledge Resources") }, extraClientlibs = { "cq.authoring.waters.dialog" })
@Model(adaptables = SlingHttpServletRequest.class, adapters = { Resources.class,
		ComponentExporter.class }, resourceType = Resources.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Resources implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/resources";

	@DialogField(fieldLabel = "Title", fieldDescription = "Enter the Title for the List", required = true)
	@TextField
	@Inject
	private String title;

	@DialogField(fieldLabel = "Build List Using", fieldDescription = "Build Resources List using Tags or Fixed Id", required = true)
	@Selection(type = Selection.SELECT, options = { @Option(text = "Tags", value = "Tags"),
			@Option(text = "Document Number", value = "docNumber"), })
	@Inject
	private String listType;

	@DialogField(fieldLabel = "Content Type", fieldDescription = "Select the Content Type", required = true)
	@TagInputField(rootPath = WatersConstants.TAG_CONTENT_TYPE_PATH)
	@Inject
	private String contentType;

	@DialogField(fieldLabel = "Tags", fieldDescription = "Selects the Tags")
	@TagInputField(rootPath = WatersConstants.TAG_ROOT_PATH)
	@Inject
	private String[] tags;

	@DialogField(fieldLabel = "Document Number", fieldDescription = "Enter the Support Document partnumber")
	@MultiField
	@TextField
	@Inject
	private String[] docNumber;

	@DialogField(fieldLabel = "ID", fieldDescription = "HTML Id attribute to enter to this component")
	@TextField
	@Inject
	private String id;

	@DialogField(fieldLabel = "Max Items", fieldDescription = "Maximum Numbers of Items displayed in the list")
	@NumberField
	@Inject
	private String maxItems;

	@SlingObject
	ResourceResolver resourceResolver;

	@Self
	private SiteContext siteContext;

	private TagManager tagManager;

	@PostConstruct
	public void init() {
		tagManager = resourceResolver.adaptTo(TagManager.class);
	}

	public String getTitle() {
		return title;
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

	private String getContentType() {

		if (StringUtils.isNotBlank(contentType)) {
			Tag tag = tagManager.resolve(contentType);
			contentType = tag.getName();

		}

		return contentType;
	}

	private List<String> getTags() {
		List<String> tagList = new ArrayList<>();

		for (String tagString : tags) {
			Tag tag = tagManager.resolve(tagString);
			tagList.add(tag.getName());

		}

		return tagList;

	}

	public String getResourcesQuery() {

		StringBuilder builder = new StringBuilder();

		Locale isoCode = siteContext.getLocaleWithCountry();

		List<String> keywords = new ArrayList<>();

		if (StringUtils.equalsIgnoreCase(listType, "tags")) {
			keywords = getTags();

			builder.append("category=").append("Knowledge Library");
			builder.append("&isocode=").append(isoCode);
			builder.append("&content_type=").append(getContentType());
		} else {
			builder.append("category=").append("Support Library");
			builder.append("&isocode=").append(isoCode);

			keywords = Arrays.asList(docNumber);
		}

		builder.append("&keyword=").append(Text.escape(StringUtils.join(keywords, " ")))
				.append("&multiselect=true&page=1&rows=").append(Long.parseLong(maxItems))
				.append("&sort=most-relevant");
		return builder.toString();
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}