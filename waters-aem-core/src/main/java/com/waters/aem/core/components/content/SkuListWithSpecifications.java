package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;

@Component(value = "SKU List With Specifications",
			listeners = {
			@Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
			@Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
			@Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE) },
			tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class, adapters = { SkuListWithSpecifications.class,
		ComponentExporter.class }, resourceType = SkuListWithSpecifications.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public final class SkuListWithSpecifications implements ComponentExporter {

	public static final String RESOURCE_TYPE = "waters/components/content/skulistwithspecifications";

	@DialogField(fieldLabel = "Sku Numbers", fieldDescription = "Enter the Sku Number", renderReadOnly = false, required = true, ranking = 1)
	@MultiField
	@TextField
	@Inject
	private String[] skuCodeList = new String[0];

	@DialogField(fieldLabel = "View All Products Link", fieldDescription = "Enter the Search Link to view all the products ", ranking = 2)
	@PathField
	@Inject
	private String searchProductsLink;


	public String[] getSkuCodeList() {
		return skuCodeList;
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

	public String getSearchProductsLink() {
		return searchProductsLink;
	}
	
}