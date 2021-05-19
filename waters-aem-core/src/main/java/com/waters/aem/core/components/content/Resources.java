package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import java.text.MessageFormat;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

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
import com.day.text.Text;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.tagging.WatersTagInject;
import com.waters.aem.core.utils.SearchUtils;

@Component(value = "Resources", description = "This component Displays list of resources", listeners = {
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) }, tabs = {
				@Tab(title = "Knowledge Resources") }, extraClientlibs = { "cq.authoring.waters.dialog" })
@Model(adaptables = SlingHttpServletRequest.class, adapters = { Resources.class,
		ComponentExporter.class }, resourceType = Resources.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Resources implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/resources";

	private static final ObjectMapper MAPPER = new ObjectMapper();

	@DialogField(fieldLabel = "Title", fieldDescription = "Enter the Title for the List")
	@TextField
	@Inject
	private String title;

	@DialogField(fieldLabel = "Build List Using", fieldDescription = "Build Resources List using Tags or Fixed Id")
	@Selection(type = Selection.SELECT, options = { @Option(text = "Tags", value = "Tags"),
			@Option(text = "Document Number", value = "docNumber"), })
	@Inject
	private String listType;

	@DialogField(fieldLabel = "Category", fieldDescription = "Select the Category", required = true, disabled = true)
	@Selection(type = Selection.SELECT, options = { @Option(text = "Library", value = "library:Library"),
			@Option(text = "Support Library", value = "support%20library:Support%2520Library"), })
	@Inject
	private String category;

	@DialogField(fieldLabel = "Content Type", fieldDescription = "Select the Content Type")
	@TagInputField(rootPath = WatersConstants.TAG_CONTENT_TYPE_PATH)
	@WatersTagInject
	private List<Tag> contentType = Collections.emptyList();

	@DialogField(fieldLabel = "Tags", fieldDescription = "Selects the Tags")
	@TagInputField(rootPath = WatersConstants.TAG_ROOT_PATH)
	@WatersTagInject
	private List<Tag> tags = Collections.emptyList();

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

	@Self
	private SiteContext siteContext;

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

	public String getCategory() {
		if (StringUtils.equalsIgnoreCase(listType, "tags")) {
			category = "library:Library";
		}
		else {
			category = "support%20library:Support%2520Library";
		}
		return category;
	}

	public String getContentType() throws JsonProcessingException {
		return MAPPER.writeValueAsString(contentType.stream()
				.map(tag -> ImmutableMap.<String, String>builder()
						.put("facetName", SearchUtils.getSolrFacetName(tag.getName())).put("facetValue", tag.getTitle())
						.put("facetTranslation", tag.getTitle(siteContext.getLocale())).build())
				.collect(Collectors.toList()));
	}

	public String getTags() throws JsonProcessingException {
		return MAPPER.writeValueAsString(tags.stream()
				.map(tag -> ImmutableMap.<String, String>builder()
						.put("facetName", SearchUtils.getSolrFacetName(tag.getName())).put("facetValue", tag.getTitle())
						.put("facetTranslation", tag.getTitle(siteContext.getLocale())).build())
				.collect(Collectors.toList()));

	}

	public String getDocNumber() {
		String number = StringUtils.EMPTY;
		if (null != docNumber && docNumber.length > 0) {
			number = Text.escape(StringUtils.join(docNumber, " "));
		}
		return number;
	}

	public String getSearchResultQuery() throws JsonProcessingException {
		String contentTypeWithTagSearchQuery = "category={0}&isocode={1}&content_type={2}&multiselect=true&page=1&rows=25&sort=most-recent";
		String contentTypeWithoutTagSearchQuery = "category={0}&isocode={1}&content_type={2}&facet={3}&multiselect=true&page=1&rows=25&sort=most-recent";
		String documentSearchQuery = "category={0}&isocode={1}&keyword={2}&multiselect=true&page=1&rows=25&sort=most-recent";

		String result;
		Locale isocode = siteContext.getLocaleWithCountry();

		if (StringUtils.equalsIgnoreCase(listType, "tags")) {

			if (StringUtils.isNotEmpty(getTags())) {
				result = MessageFormat.format(contentTypeWithTagSearchQuery, getCategory(), isocode, getContentType(),
						getTags());
			} else {

				result = MessageFormat.format(contentTypeWithoutTagSearchQuery, getCategory(), isocode,
						getContentType());

			}
		} else {
			result = MessageFormat.format(documentSearchQuery, getCategory(), isocode, getDocNumber());
		}

		return result;
	}

	public String getResourcesQuery() throws JsonProcessingException {
		String contentTypeWithTagQuery = "category_facet${0}?isocode={1}&contenttype_facet${2}&technique_facet${3}&multiselect=true&page=1&rows={4}&sort=most-rec";
		String contentTypeWithoutTagQuery = "category_facet${0}?isocode={1}&contenttype_facet{2}&multiselect=true&page=1&rows={3}&sort=most-recent";
		String documentQuery = "category_facet${0}?isocode={1}&keyword={2}&multiselect=true&page=1&rows={3}&sort=most-recent";

		String query;
		Locale isocode = siteContext.getLocaleWithCountry();

		if (StringUtils.equalsIgnoreCase(listType, "tags")) {
			if (StringUtils.isNotEmpty(getTags())) {
				query = MessageFormat.format(contentTypeWithTagQuery, getCategory(), isocode, getContentType(),
						getTags(), getMaxItems());
			} else {
				query = MessageFormat.format(contentTypeWithoutTagQuery, getCategory(), isocode, getContentType(),
						getMaxItems());
			}
		} else {
			query = MessageFormat.format(documentQuery, getCategory(), isocode, getDocNumber(), getMaxItems());
		}

		return query;
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}