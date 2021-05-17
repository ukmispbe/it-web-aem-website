package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import java.text.MessageFormat;
import java.util.Locale;

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
import com.day.text.Text;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;

@Component(value = "Resources", description = "This component Displays list of resources", listeners = {
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) }, tabs = {
				@Tab(title = "Knowledge Resources") }, extraClientlibs = { "cq.authoring.waters.dialog" })
@Model(adaptables = SlingHttpServletRequest.class, adapters = { Resources.class,
		ComponentExporter.class}, resourceType = Resources.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Resources implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/resources";

	@DialogField(fieldLabel = "Title", fieldDescription = "Enter the Title for the List", required = true)
	@TextField
	@Inject
	private String title;

	@DialogField(fieldLabel = "Build List Using", fieldDescription = "Build Resources List using Tags or Fixed Id")
	@Selection(type = Selection.SELECT, options = { @Option(text = "Tags", value = "Tags"),
			@Option(text = "Document Number", value = "docNumber"), })
	@Inject
	private String listType;

	@DialogField(fieldLabel = "Content Type", fieldDescription = "Select the Content Type")
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

	public String getContentType() {
		return Text.escape(contentType);
	}

	private String getTags() {
		String tag = StringUtils.EMPTY;
		if (null!=tags && tags.length >0) {
			tag = Text.escape(StringUtils.join(tags, " "));
		}
		return tag;
	}

	private String getDocNumber() {
		String number = StringUtils.EMPTY;
		if (docNumber.length > 0) {
			number = Text.escape(StringUtils.join(docNumber, " "));
		}
		return number;
	}

	public String getResourcesQuery() {

        String tagQuery = "category_facet${0}&contenttype_facet${1}&technique_facet${2}?isocode={3}&keyword=%2A%3A%2A&multiselect=true&page=1&rows=25&sort=most-rec";
        String contentTypeQuery = "category_facet${0}&contenttype_facet${1}?isocode={2}&keyword=%2A%3A%2A&multiselect=true&page=1&rows=25&sort=most-recent";
        String keywordQuery = "category_facet${0}?isocode={1}&keyword={2}&multiselect=true&page=1&rows=25&sort=most-recent";

        String query = StringUtils.EMPTY;
        Locale isoCode = siteContext.getLocaleWithCountry();

        if (StringUtils.equalsIgnoreCase(listType, "tags")) {
            if(StringUtils.isNotEmpty(getTags())){
            	 query = MessageFormat.format(tagQuery,"library:Library",getContentType(),getTags(),getId(),getMaxItems(),isoCode);
            } else {
                query =  MessageFormat.format(contentTypeQuery,"library:Library",getContentType(),getId(),getMaxItems(),isoCode);
            }
        } else {
           query = MessageFormat.format(keywordQuery,"support%20library:Support%2520Library",isoCode,getDocNumber(),getId(),getMaxItems());
        }
       
        return query;
    }

	
	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}