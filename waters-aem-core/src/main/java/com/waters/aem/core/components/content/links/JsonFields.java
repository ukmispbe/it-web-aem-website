package com.waters.aem.core.components.content.links;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class JsonFields {

    @Inject
    private String labelKey;

    @Inject
    private String labelValue;

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Label Name",
            fieldDescription = "Enter Label Name",
            required = true,
            ranking = 1)
    @TextField
    public String getLabelKey() {
        return labelKey;
    }

    @DialogField(fieldLabel = "Label Text",
            fieldDescription = "Enter Label Text",
            required = true,
            ranking = 2)
    @TextField
    public String getLabelValue() { return labelValue; }
}
