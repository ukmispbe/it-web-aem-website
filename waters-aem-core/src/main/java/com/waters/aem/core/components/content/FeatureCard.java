package com.waters.aem.core.components.content;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.constants.WatersConstants;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FeatureCard {
	
	@DialogField(fieldLabel = "Icon", fieldDescription = "Select the icon to be added for this feature", required = true)
	@PathField(rootPath = WatersConstants.DAM_ICON_PATH)
	@Inject
	private String icon;
	
	@DialogField(fieldLabel = "Feature", fieldDescription = "Enter the Feature")
	@TextField
	@Inject
	private String feature;
	
	public String getIcon() {
		return icon;
	}

	public String getFeature() {
		return feature;
	}

}
