package com.waters.aem.core.components.structure;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


@Component(value = "Header",
    group = ComponentConstants.GROUP_HIDDEN,
    path = "/structure")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Header {

    @DialogField(fieldLabel = "Header Log",
        fieldDescription = "select header logo",
        required = true,
        ranking = 1)
    @PathField ()
    private String headerLogo;
}
