package com.waters.aem.core.components.structure;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import java.util.Calendar;

@Component(value = "Footer",
    group = ComponentConstants.GROUP_HIDDEN,
    path = "/structure")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Footer extends AbstractComponent {

    @DialogField(fieldLabel = "Copyright Text", ranking = 1)
    @TextField
    public String getCopyrightText() {
        final String defaultCopyrightText = new StringBuilder()
            .append("© ")
            .append(Calendar.getInstance().get(Calendar.YEAR))
            .append(" Waters.  All rights reserved.")
            .toString();

        return getInherited("copyrightText", defaultCopyrightText);
    }
}
