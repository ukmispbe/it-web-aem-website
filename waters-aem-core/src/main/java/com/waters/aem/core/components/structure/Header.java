package com.waters.aem.core.components.structure;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.CheckBox;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.services.commerce.WatersCommerceService;
import com.waters.aem.core.services.launch.AdobeLaunchService;
import com.waters.aem.core.utils.LinkUtils;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Header",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    tabs = {
        @Tab(title = "Properties"),
        @Tab(title = "My Account")
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Header.class, ComponentExporter.class },
    resourceType = Header.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Header extends AbstractComponent implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/structure/header";

    @Self
    private SiteContext siteContext;

    @OSGiService
    private WatersAccountService watersAccountService;

    @OSGiService
    private WatersCommerceService watersCommerceService;

    @OSGiService
    private AdobeLaunchService adobeLaunchService;

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Header Logo",
        fieldDescription = "select header logo",
        ranking = 1)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @ImageInject(inherit = true)
    private Image logo;

    @DialogField(fieldLabel = "Logo Link",
        fieldDescription = "Select or Enter Logo Link",
        ranking = 2)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link logoLink;

    @DialogField(fieldLabel = "Logo Alt Text",
        fieldDescription = "Enter Alt Text for Logo",
        ranking = 3)
    @TextField
    @InheritInject
    private String logoAltText;

    @DialogField(fieldLabel = "Search Path",
        fieldDescription = "Select Search Path",
        ranking = 4)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link searchPath;

    @DialogField(fieldDescription = "Include H1 Tag",
            value = "true",
            ranking = 5)
    @CheckBox(title = "includeH1Tag",
            text = "Include H1 Tag")
    @Inject
    private Boolean includeH1Tag;


    @DialogField(fieldLabel = "My Account Link",
        fieldDescription = "Select or Enter the My Account Link",
        tab = 2,
        ranking = 2
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link myAccountLink;

    @DialogField(fieldLabel = "Sign In Link",
        fieldDescription = "Select or Enter the Sign In Link",
        tab = 2,
        ranking = 2
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link signInLink;

    @DialogField(fieldLabel = "Sign Out Link",
        fieldDescription = "Select or Enter the Sign Out Link",
        tab = 2,
        ranking = 3
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link signOutLink;

    @DialogField(fieldLabel = "Switch Account Link",
        fieldDescription = "Select or Enter the Switch Account Link",
        tab = 2,
        ranking = 4
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link switchAccountLink;

    @DialogField(fieldLabel = "Create Account Link",
        fieldDescription = "Select or Enter the Create Account Link",
        tab = 2,
        ranking = 5
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link createAccountLink;

    @DialogField(fieldLabel = "Profile Link",
        fieldDescription = "Select or Enter the Profile Link",
        tab = 2,
        ranking = 6
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link profileLink;

    @DialogField(fieldLabel = "Orders Link",
        fieldDescription = "Select or Enter the Orders Link",
        tab = 2,
        ranking = 7
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link ordersLink;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public Link getSearchPath() {
        return searchPath;
    }

    public Image getLogo() {
        return logo;
    }

    public Link getLogoLink() {
        return logoLink;
    }

    public String getLogoAltText() {
        return logoAltText;
    }

    public Link getMyAccountLink() {
        return myAccountLink;
    }

    public Link getSignInLink() {
        return signInLink;
    }

    public Link getSignOutLink() {
        return signOutLink;
    }

    public Link getSwitchAccountLink() {
        return switchAccountLink;
    }

    public Link getCreateAccountLink() {
        return createAccountLink;
    }

    public Link getProfileLink() {
        return profileLink;
    }

    public Link getOrdersLink() {
        return ordersLink;
    }

    public String getMyAccountTitle() {
        return !LinkUtils.isExternal(myAccountLink) ? currentPage.getPageManager().getPage(myAccountLink.getPath())
            .getTitle() : "";
    }

    public String getSignInPageTitle() {
        return !LinkUtils.isExternal(signInLink) ? currentPage.getPageManager().getPage(signInLink.getPath())
            .getTitle() : "";
    }

    public String getSignOutPageTitle() {
        return !LinkUtils.isExternal(signOutLink) ? currentPage.getPageManager().getPage(signOutLink.getPath())
        .getTitle() : "";
    }

    public String getSwitchAccountPageTitle() {
        return !LinkUtils.isExternal(switchAccountLink) ? currentPage.getPageManager().getPage(switchAccountLink.getPath())
            .getTitle() : "";
    }

    public String getCreateAccountPageTitle() {
        return !LinkUtils.isExternal(createAccountLink) ? currentPage.getPageManager().getPage(createAccountLink.getPath())
            .getTitle() : "";
    }

    public String getProfilePageTitle() {
        return !LinkUtils.isExternal(profileLink) ? currentPage.getPageManager().getPage(profileLink.getPath())
            .getTitle() : "";
    }

    public String getOrdersPageTitle() {
        return !LinkUtils.isExternal(ordersLink) ? currentPage.getPageManager().getPage(ordersLink.getPath())
        .getTitle() : "";
    }

    public Boolean isIncludeH1Tag() { return includeH1Tag; }

    public Boolean isExternal() {
        return LinkUtils.isExternal(logoLink);
    }

    public Boolean isFormPage() {
        return Templates.isFormPage(currentPage);
    }

    public String getSignInUrl() {
        return watersAccountService.getSignInUrl();
    }

    public String getSignOutUrl() {
        return watersAccountService.getSignOutUrl();
    }

    public String getMyAccountUrl() {
        return watersAccountService.getMyAccountUrl();
    }

    public String getLegacySearchUrl() {
        return watersAccountService.getLegacySearchUrl();
    }

    public String getViewCartUrl() {
        return watersCommerceService.getViewCartUrl();
    }

    public String getLaunchScript() {
        return adobeLaunchService.getLaunchScript();
    }
}
