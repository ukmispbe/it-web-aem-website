package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.NumberField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.commerce.WatersCommerceService;

@Component(value = "Promotions", description = "This is the Promotions component for Waters site.", listeners = {
		@Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
		@Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE) }, tabs = { @Tab(title = "Properties") })
@Model(adaptables = Resource.class, adapters = { Promotions.class,
		ComponentExporter.class }, resourceType = Promotions.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public final class Promotions implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/promotions";

@DialogField(fieldLabel = "Title", fieldDescription = "Enter the title for the promotions component", required = true)
	@TextField
	@Inject
	private String title;

	@DialogField(fieldLabel = "Logo", fieldDescription = "Choose the logo for promotions")
	@PathField(rootPath = WatersConstants.DAM_PATH)
	@Inject
	private String logo;

	@DialogField(fieldLabel = "Max Items", fieldDescription = "Maximum number if promotions displayed")
	@NumberField
	@Inject
	private long maxItems;

	@DialogField(fieldLabel = "View All Promotions Links", fieldDescription = "Enter the link to View all promotions page")
	@PathField(rootPath = WatersConstants.ROOT_PATH)
	@Inject
	private String viewAllPromotionsUrl;
	
	@OSGiService
	WatersCommerceService commerceService;
	
	public String getTitle() {
		return title;
	}

	public String getLogo() {
		return logo;
	}

	public long getMaxItems() {
		return maxItems;
	}

	public String getViewAllPromotionsUrl() {
		return viewAllPromotionsUrl;
	}
	
	public String getApplyToCartUrl() {
		return commerceService.getAddToCartUrl();
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
	
}