package com.waters.aem.core.components.structure;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.foundation.Image;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.content.applicationnotes.ExternalLinkItem;
import com.waters.aem.core.components.structure.page.analytics.DataLayer;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Calendar;
import java.util.List;

@Component(value = "External Footer",
    description = "This is the External Footer component for Waters site",
    editConfig = false,
    tabs = {
        @Tab(title = "Properties"),
        @Tab(title = "Footer Links"),
        @Tab(title = "Content List 1"),
        @Tab(title = "Content List 2"),
        @Tab(title = "Content List 3"),
        @Tab(title = "Content List 4"),
        @Tab(title = "Content List 5")
    },
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ExternalFooter.class, ComponentExporter.class },
    resourceType = ExternalFooter.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class ExternalFooter extends AbstractComponent implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/structure/externalfooter";

    @Inject
    private PageDecorator currentPage;

    @ChildResource(name = "../")
    private DataLayer dataLayer;

    @DialogField(fieldLabel = "Logo",
        fieldDescription = "Select the logo image to display on footer",
        ranking = 1)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @ImageInject(inherit = true)
    private Image logoImage;

    @DialogField(fieldLabel = "Logo Link",
        fieldDescription = "Select or enter the link URL",
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link logoLink;

    @DialogField(fieldLabel = "Logo Alt Text",
        fieldDescription = "Enter the ALT text for the logo image",
        ranking = 3)
    @TextField
    @InheritInject
    private String logoAltText;

    @DialogField(fieldLabel = "Copyright Text",
        fieldDescription = "Enter the copyright text",
        ranking = 4)
    @TextField
    @JsonProperty
    public String getCopyrightText() {
        final String defaultCopyrightText = new StringBuilder()
            .append("© ")
            .append(Calendar.getInstance().get(Calendar.YEAR))
            .append(" Waters Corporation. All Rights Reserved.")
            .toString();

        return getInherited("copyrightText", defaultCopyrightText);
    }

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 5)
    @Switch(offText = "No", onText = "Yes")
    @InheritInject
    @Default(booleanValues = false)
    private Boolean newWindow;

    @DialogField(fieldLabel = "Cookies Link",
        fieldDescription = "Select or enter the link URL",
        tab = 2,
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link cookiesLink;

    @DialogField(fieldLabel = "Footer Links",
        tab = 2,
        ranking = 2)
    @MultiField(composite = true)
    @InheritInject
    private List<ExternalLinkItem> footerLinks;

    @DialogField(fieldLabel = "Content List 1 Links",
    tab = 3,
    ranking = 1)
    @MultiField(composite = true)
    @InheritInject
    private List<ExternalLinkItem> contentList1;

    @DialogField(fieldLabel = "Content List 2 Links",
    tab = 4,
    ranking = 1)
    @MultiField(composite = true)
    @InheritInject
    private List<ExternalLinkItem> contentList2;

    @DialogField(fieldLabel = "Content List 3 Links",
    tab = 5,
    ranking = 1)
    @MultiField(composite = true)
    @InheritInject
    private List<ExternalLinkItem> contentList3;

    @DialogField(fieldLabel = "Content List 4 Links",
    tab = 6,
    ranking = 1)
    @MultiField(composite = true)
    @InheritInject
    private List<ExternalLinkItem> contentList4;

    @DialogField(fieldLabel = "Content List 5 Links",
    tab = 7,
    ranking = 1)
    @MultiField(composite = true)
    @InheritInject
    private List<ExternalLinkItem> contentList5;

    public List<ExternalLinkItem> getContentList1() {
        return contentList1;
    }

    public List<ExternalLinkItem> getContentList2() {
        return contentList2;
    }

    public List<ExternalLinkItem> getContentList3() {
        return contentList3;
    }

    public List<ExternalLinkItem> getContentList4() {
        return contentList4;
    }

    public List<ExternalLinkItem> getContentList5() {
        return contentList5;
    }

    public List<List<ExternalLinkItem>> getContentLists() {
        return new ImmutableList.Builder<List<ExternalLinkItem>>()
            .add(contentList1)
            .add(contentList2)
            .add(contentList3)
            .add(contentList4)
            .add(contentList5)
            .build();
    }

    @JsonProperty
    public Image getLogoImage() {
        return logoImage;
    }

    @JsonProperty
    public Link getLogoLink() {
        return logoLink;
    }

    @JsonProperty
    public String getLogoAltText() {
        return logoAltText;
    }

    @JsonProperty
    public Boolean isNewWindow() {
        return newWindow;
    }

    @JsonProperty
    public Link getCookiesLink() {
        return cookiesLink;
    }

    @JsonProperty
    public List<ExternalLinkItem> getFooterLinks() {
        return footerLinks;
    }

    public String getDataLayer() throws JsonProcessingException {
        return dataLayer.getJsonData();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
