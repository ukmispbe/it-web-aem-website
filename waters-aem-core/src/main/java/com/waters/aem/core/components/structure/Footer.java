package com.waters.aem.core.components.structure;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.commons.LanguageUtil;
import com.day.cq.wcm.foundation.Image;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.ImageInject;
import com.icfolson.aem.library.models.annotations.InheritInject;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.links.BasicLink;
import com.waters.aem.core.components.content.links.IconOnlyLink;
import com.waters.aem.core.components.structure.page.CountryCommerceConfig;
import com.waters.aem.core.components.structure.page.analytics.DataLayer;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.commerce.WatersCommerceService;
import com.waters.aem.core.utils.LinkUtils;
import com.waters.aem.core.utils.LocaleUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

@Component(value = "Footer",
    description = "This is the Footer component for Waters site",
    editConfig = false,
    tabs = {
        @Tab(title = "Properties"),
        @Tab(title = "Legal Icons"),
        @Tab(title = "Footer Links"),
        @Tab(title = "Share Links"),
        @Tab(title = "WeChat (China)")
    },
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Footer.class, ComponentExporter.class },
    resourceType = Footer.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Footer extends AbstractComponent implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/structure/footer";

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @ChildResource(name = "../")
    private DataLayer dataLayer;

    @OSGiService
    private WatersCommerceService watersCommerceService;

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
    
    @DialogField(fieldLabel = "Contact Us",
        fieldDescription = "Select or enter the Contact URL",
        ranking = 5)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link contactLink;

    @DialogField(fieldLabel = "Shanghai ICP Number",
            fieldDescription = "Enter the Shanghai ICP Number",
            tab = 2,
            ranking = 1
    )
    @TextField
    @InheritInject
    private String sICPNumber;

    @DialogField(fieldLabel = "Shanghai ICP Number Legal Icon",
            fieldDescription = "Select the legal icon to display on footer",
            tab = 2,
            ranking = 3
    )
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String sICPLegalIcon;

    @DialogField(fieldLabel = "Shanghai ICP Number Legal Link",
            fieldDescription = "Select or enter the link URL",
            tab = 2,
            ranking = 2
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link sICPLegalLink;

    @DialogField(fieldLabel = "Beijing Public Network Security Number",
            fieldDescription = "Enter the Beijing Public Network Security Number",
            tab = 2,
            ranking = 4
    )
    @TextField
    @InheritInject
    private String bPNSNumber;

    @DialogField(fieldLabel = "Beijing Public Network Security Number Legal Icon",
            fieldDescription = "Select the legal icon to display on footer",
            tab = 2,
            ranking = 6
    )
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String bPNSLegalIcon;

    @DialogField(fieldLabel = "Beijing Public Network Security Number Legal Link",
            fieldDescription = "Select or enter the link URL",
            tab = 2,
            ranking = 5
    )
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link bPNSLegalLink;

    @DialogField(fieldLabel = "Cookies Link",
        fieldDescription = "Select or enter the link URL",
        tab = 3,
        ranking = 1)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject(inherit = true)
    private Link cookiesLink;

    @DialogField(fieldLabel = "Footer Links",
        tab = 3,
        ranking = 2)
    @MultiField(composite = true)
    @InheritInject
    private List<BasicLink> footerLinks;

    @DialogField(fieldLabel = "Social Links",
        tab = 4,
        ranking = 2)
    @MultiField(composite = true)
    @InheritInject
    private List<IconOnlyLink> socialLinks;

    @DialogField(fieldLabel = "WeChat Icon",
            fieldDescription = "Select the WeChat icon to display on footer (China only)",
            tab = 5,
            ranking = 1)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @InheritInject
    private String weChatIcon;

    @DialogField(fieldLabel = "WeChat QR Code Image",
            fieldDescription = "Select the WeChat QR Code to display in the WeChat modal",
            tab = 5,
            ranking = 2)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @ImageInject(inherit = true)
    private Image weChatQrCodeImage;

    private List<LanguageSelectorItem> languagePages;

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

    public Link getContactLink() {
        return contactLink;
    }

    @JsonProperty
    public Boolean isExternal() {
        return LinkUtils.isExternal(logoLink);
    }

    @JsonProperty
    public Link getCookiesLink() {
        return cookiesLink;
    }

    @JsonProperty
    public String getSICPNumber() { 
        return sICPNumber;
    }

    @JsonProperty
    public String getSICPLegalIcon() { 
        return sICPLegalIcon; 
    }

    @JsonProperty
    public Link getSICPLegalLink() {
        return sICPLegalLink;
    }

    @JsonProperty
    public String getBPNSNumber() { 
        return bPNSNumber;
    }

    @JsonProperty
    public String getBPNSLegalIcon() {
        return bPNSLegalIcon; 
    }

    @JsonProperty
    public Link getBPNSLegalLink() {
        return bPNSLegalLink; 
    }

    @JsonProperty
    public List<BasicLink> getFooterLinks() {
        return footerLinks;
    }

    public List<IconOnlyLink> getSocialLinks() {
        return socialLinks;
    }

    public String getWeChatIcon() {
        return weChatIcon;
    }

    public Image getWeChatQrCodeImage() {
        return weChatQrCodeImage;
    }

    public String getDataLayer() throws JsonProcessingException {
        return dataLayer.getJsonData();
    }

    public String getLanguageLocation() {
        return siteContext.getLanguageLocation();
    }

    public Boolean isChinaPage() {
        return Locale.CHINA.getCountry().equals(siteContext.getLocaleWithCountry().getCountry());
    }

    public List<LanguageSelectorItem> getLanguagePages() {
        if (languagePages == null) {
            languagePages = new ArrayList<>();

            for (PageDecorator languagePage : LocaleUtils.getLanguagePages(currentPage)) {
                final PageDecorator languageHomepage =
                        languagePage.findAncestor(WatersConstants.PREDICATE_HOME_PAGE).orNull();

                if (languageHomepage != null) {
                    languagePages.add(new LanguageSelectorItem(languagePage));
                }
            }
        }

        return languagePages;
    }

    public String getCountryName() {
        String countryName = "";

        final String languageRoot = LanguageUtil.getLanguageRoot(currentPage.getPath());

        if (languageRoot != null) {
            countryName = currentPage.getPageManager().getPage(languageRoot)
                    .getParent()
                    .getTitle();
        }

        return countryName;
    }

    /**
     * Get isocode to send to be used by front end SKU service.
     *
     * @return isocode from page locale
     */
    public String getIsoCode() {
        return siteContext.getLocale().toString();
    }

    /**
     * Get country code from page locale to be used by front end SKU service.
     *
     * @return country code from page locale
     */
    public String getCountryCode() {
        return siteContext.getLocaleWithCountry().getCountry();
    }

    public String getSkuAvailabilityUrl() {
        return watersCommerceService.getSkuAvailabilityUrl();
    }

    public String getSkuCustomerPriceUrl() {
        return watersCommerceService.getSkuCustomerPriceUrl();
    }

    public String getAddToCartUrl() {
        return watersCommerceService.getAddToCartUrl();
    }

    public String viewCartUrl() {
        return watersCommerceService.getViewCartUrl();
    }

    public String getLocale() {
        return siteContext.getLocale().toLanguageTag();
    }

    public CountryCommerceConfig getCommerceConfig() {
        return siteContext.getCountryCommerceConfig();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
