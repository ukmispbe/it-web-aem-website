package com.waters.aem.core.components.structure;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.*;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.content.applicationnotes.LinkItem;
import com.waters.aem.core.components.content.applicationnotes.RegionLinkItem;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import com.icfolson.aem.library.api.page.PageDecorator;

import javax.inject.Inject;
import java.util.List;
import java.util.Locale;


@Component(value = "External Header",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    tabs = {
        @Tab(title = "Properties"),
        @Tab(title = "Header Links"),
        @Tab(title = "Region Selector")
    })
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class ExternalHeader {

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Header Logo",
        fieldDescription = "select header logo",
        ranking = 1)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @ImageInject
    private Image logo;

    @DialogField(fieldLabel = "Logo Link",
        fieldDescription = "Select or Enter Logo Link",
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link logoLink;

    @DialogField(fieldLabel = "Logo Alt Text",
        fieldDescription = "Enter Alt Text for Logo",
        ranking = 3)
    @TextField
    @Inject
    private String logoAltText;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    @DialogField(fieldLabel = "Link Items",
        fieldDescription = "Enter external article details",
        tab = 2)
    @MultiField(composite = true)
    @InheritInject
    private List<LinkItem> linkItems;

    @DialogField(fieldLabel = "Region Link Details", tab = 3)
    @DialogFieldSet(namePrefix = "./regionLinkItem/")
    @Inject
    private RegionLinkItem regionLinkItem;

    public Image getLogo() {
        return logo;
    }

    public Link getLogoLink() {
        return logoLink;
    }

    public String getLogoAltText() {
        return logoAltText;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    public List<LinkItem> getLinkItems() {
        return linkItems;
    }

    public RegionLinkItem getRegionLinkItem() {
        return regionLinkItem;
    }

    public String getLanguageLocation(){
        Locale locale = currentPage.getLanguage();
        String languageCode = locale.getLanguage().toUpperCase();
        String countryCode =  locale.getCountry();
        StringBuilder stringBuilder = new StringBuilder();

        if(!StringUtils.isBlank(languageCode)){
            stringBuilder.append(languageCode);
        }
        if(!StringUtils.isBlank(languageCode) && !StringUtils.isBlank(countryCode)){
            stringBuilder.append("/");
        }
        if(!StringUtils.isBlank(countryCode)){
            stringBuilder.append(countryCode);
        }

        return stringBuilder.toString();
    }
}
