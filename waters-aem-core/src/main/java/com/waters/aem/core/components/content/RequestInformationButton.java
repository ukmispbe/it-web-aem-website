package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.waters.aem.core.services.commerce.WatersCommerceService;

@Component(value = "Request Information Button", 
			description = "This is the Request Information Button component for Waters site", 
listeners = {
		@Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) })
@Model(adaptables = SlingHttpServletRequest.class, adapters = { RequestInformationButton.class,
		ComponentExporter.class }, resourceType = RequestInformationButton.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class RequestInformationButton implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/requestinformationbutton";

	@SlingObject
	ResourceResolver resolver;

	@Inject
	Page currentPage;

	@OSGiService
	private WatersCommerceService watersCommerceService;

	@DialogField(fieldLabel = "Button Text", fieldDescription = "Enter the text for the button", required = true)
	@TextField
	@Inject
	private String buttonText;

	@DialogField(fieldLabel = "Button ToolTip", fieldDescription = "Enter the tooltip text")
	@TextField
	@Inject
	private String buttonToolTip;

	@DialogField(fieldLabel = "Request Type", fieldDescription = "Select the Request Type", required = true)
	@Selection(
	        type = Selection.SELECT,
	        options = {
	            @Option(text = "Consumables & Columns", value = "COLS"),
	            @Option(text = "Informatics & Software", value = "SOFT"),
	            @Option(text = "Instruments & Systems", value = "SYST"),
	            @Option(text = "Services", value = "SERV")
	        }
	    )
	@Inject
	private String requestType;

	private String getPageTitle() {
		ValueMap pageProperties = currentPage.getProperties();
		return pageProperties.get(JcrConstants.JCR_TITLE, String.class);
	}

	public String getHref() {
		StringBuilder builder = new StringBuilder();
		builder.append(watersCommerceService.getContactUsLink()).append("?pageFromTitle=").append(getPageTitle());
		if (StringUtils.isNotEmpty(requestType)) {
			builder.append("&raqType=").append(requestType).append("&raqOnly=Y");
		}
		return builder.toString();
	}

	public String getButtonText() {
		return buttonText;
	}

	public String getButtonToolTip() {
		return buttonToolTip;
	}

	public String getRequestType() {
		return requestType;
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}