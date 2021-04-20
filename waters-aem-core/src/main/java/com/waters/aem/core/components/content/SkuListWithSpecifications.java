package com.waters.aem.core.components.content;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.commerce.WatersCommerceService;
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
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

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

	@OSGiService
	private WatersCommerceService watersCommerceService;

	@DialogField(fieldLabel = "Sku Numbers",
			fieldDescription = "List of Skus to display when this component is authored on a non-SKU page. Any SKUs not " +
					"sold in the current country will not be displayed. (Default country is US if no other country is " +
					"found)",
			renderReadOnly = false,
			required = true,
			ranking = 2)
	@MultiField
	@TextField
	@Inject
	private String[] skuNumbers = new String[0];

	@DialogField(fieldLabel = "View All Products Link",
			fieldDescription = "Enter the Search Link to view all the products ",
			required = true,
			ranking = 2)
	@PathField(rootPath = WatersConstants.CONTENT_ROOT_PATH)
	@Inject
	private String searchProductsLink;


	public String[] getSkuNumbers() {
		return skuNumbers;
	}

	public String getSearchProductsLink() {
		return searchProductsLink;
	}

	public String getAddToCartUrl() {
		return watersCommerceService.getAddToCartUrl();
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

}