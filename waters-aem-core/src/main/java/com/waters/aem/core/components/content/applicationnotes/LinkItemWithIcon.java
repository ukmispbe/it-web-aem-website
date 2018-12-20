package com.waters.aem.core.components.content.applicationnotes;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.icfolson.aem.library.api.link.Link;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


public class LinkItemWithIcon extends LinkItem{

    @DialogField(fieldLabel = "Link Item Icon",
        fieldDescription = "Select Link Item Icon",
        ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @LinkInject(inherit = true)
    private Link icon;

    public Link getIcon() {
        return icon;
    }

}
