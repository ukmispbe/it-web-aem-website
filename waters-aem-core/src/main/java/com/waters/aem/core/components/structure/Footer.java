package com.waters.aem.core.components.structure;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.icfolson.aem.multicompositeaddon.widget.MultiCompositeField;
import com.waters.aem.core.components.content.applicationnotes.LinkItem;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import java.util.Calendar;
import java.util.List;

@Component(value = "Footer",
    tabs = {
        @Tab(title = "General"),
        @Tab(title = "Advanced")
    },
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE)
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

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter footer link items",
        ranking = 2)
    @MultiCompositeField
    @InheritInject
    private List<LinkItem> linkItems;

    @DialogField(fieldLabel = "Legal Text",
        tab = 2,
        fieldDescription = "Enter the Legal Text",
        ranking = 1)
    @TextField
    @InheritInject
    private String legalText;

    @DialogField(fieldLabel = "Legal Link",
        tab = 2,
        fieldDescription = "Enter Legal Link",
        ranking = 2)
    @TextField
    @InheritInject
    private Link legalLink;

    @DialogField(fieldLabel = "Legal Icon",
        tab = 2,
        fieldDescription = "Select Legal Icon",
        ranking = 3)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @LinkInject(inherit = true)
    private Link legalIcon;

    public List<LinkItem> getLinkItems() {
        return linkItems;
    }

    public String getLegalText() {
        return legalText;
    }

    public Link getLegalLink() {
        return legalLink;
    }

    public Link getLegalIcon() {
        return legalIcon;
    }
}
