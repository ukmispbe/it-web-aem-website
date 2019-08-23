package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ResourceFileLocation;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.components.*;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Application Notes Page")
public class ApplicationNotesPageTest extends AbstractWatersPageTest {

    @Test
    public void Header() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("Header", "Header", 0,
        new ResourceFileLocation("header.yaml")));

        final Header headerComponent = page.getContent(Header.class, 0);

        //test Properties Tab
        assertThat(headerComponent.getLogo().substring(headerComponent.getLogo().lastIndexOf("/") + 1)).isEqualTo("waters-logo-black.svg");
        assertThat(headerComponent.getLogoLink().substring(headerComponent.getLogoLink().lastIndexOf("/") + 1)).isEqualTo("home.htm");
        assertThat(headerComponent.getLogoAltText()).isEqualTo("Alt Text Test");
        assertThat(headerComponent.isExternal()).isEqualTo(false);

    }

    @Test
    public void title() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Title", 0,
            new ResourceFileLocation("title.yaml")));

        final Title titleComponent = page.getContent(Title.class, 0);

        assertThat(titleComponent.getText()).isEqualTo("Title Test");
        assertThat(titleComponent.getType()).isEqualTo("h2");
    }

    @Test
    public void text() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Text", 0,
            new ResourceFileLocation("text.yaml")));

        final Text textComponent = page.getContent(Text.class, 0);

        assertThat(textComponent.getTitle()).isEqualTo("Title Test");
        assertThat(textComponent.getText()).isEqualTo("Text Test");
    }


    @Test
    public void button() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Button", 0,
            new ResourceFileLocation("button.yaml")));

        final Button buttonComponent = page.getContent(Button.class, 0);

        assertThat(buttonComponent.getButtonText()).isEqualTo("DOWNLOAD PDF");
        assertThat(buttonComponent.getButtonToolTip()).isEqualTo("Download PDF");
        assertThat(buttonComponent.getButtonHref()).isEqualTo("https://www.waters.com/webassets/cms/library/docs/720005893en.pdf");
        assertThat(buttonComponent.isNewWindow()).isEqualTo(true);

    }

    @Test
    public void anchor() {
        final Anchor anchorComponent = page.getContent(Anchor.class, 0);

        assertThat(anchorComponent.getLinkTitles()).containsExactly("Section 1", "Section 2", "Section 3");
    }

    @Test
    public void image() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Image", 0,
            new ResourceFileLocation("image.yaml")));

        final Image imageComponent = page.getContent(Image.class, 0);

        assertThat(imageComponent.getTitle()).isEqualTo("Title Test");
        assertThat(imageComponent.getSrc().substring(imageComponent.getSrc().lastIndexOf("/") + 1)).isEqualTo("brand-masslynx-software.png");
        assertThat(imageComponent.getAlt()).isEqualTo("Alternative Text Test");
        assertThat(imageComponent.getLink().substring(imageComponent.getLink().lastIndexOf("/") + 1)).isEqualTo("test.html");
    }

    @Test
    public void Links() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Links", 0,
        new ResourceFileLocation("links.yaml")));

        final Links LinksComponent = page.getContent(Links.class, 0);

        //Link Item 1
        assertThat(LinksComponent.getLinkItems().get(0).getText()).isEqualTo("Waters Site");
        assertThat(LinksComponent.getLinkItems().get(0).getLink()).isEqualTo("https://www.waters.com/waters/home.htm");
        assertThat(LinksComponent.getLinkItems().get(0).isExternal()).isEqualTo(false);

        //Link Item 2
        assertThat(LinksComponent.getLinkItems().get(1).getText()).isEqualTo("ICF");
        assertThat(LinksComponent.getLinkItems().get(1).getLink()).isEqualTo("https://www.icf.com/next");
        assertThat(LinksComponent.getLinkItems().get(1).isExternal()).isEqualTo(true);

    }

    @Test
    public void footer() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("Footer", "Footer", 0,
        new ResourceFileLocation("footer.yaml")));

        final Footer footerComponent = page.getContent(Footer.class, 0);

        //test Properties Tab
        assertThat(footerComponent.getLogo().substring(footerComponent.getLogo().lastIndexOf("/") + 1)).isEqualTo("waters-logo-white.svg");
        assertThat(footerComponent.getLogoLink().substring(footerComponent.getLogoLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(footerComponent.getLogoAltText()).isEqualTo("Alt Text Test");
        assertThat(footerComponent.isExternal()).isEqualTo(false);
        assertThat(footerComponent.getCopyrightText()).isEqualTo("© 2019 Waters Corporation. All Rights Reserved.");

        //Test Footer Links Tab
        //Link Item 1
        assertThat(footerComponent.getCookiesLink().substring(footerComponent.getCookiesLink()
        .lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(footerComponent.getFooterLinks().get(0).getText()).isEqualTo("Waters");
        assertThat(footerComponent.getFooterLinks().get(0).getLink().substring(footerComponent.getFooterLinks().get(0)
        .getLink().lastIndexOf("/") + 1)).isEqualTo("home.htm");
        assertThat(footerComponent.getFooterLinks().get(0).isExternal()).isEqualTo(false);

        //Link Item 2
        assertThat(footerComponent.getFooterLinks().get(1).getText()).isEqualTo("Search");
        assertThat(footerComponent.getFooterLinks().get(1).getLink().substring(footerComponent.getFooterLinks()
        .get(1).getLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(footerComponent.getFooterLinks().get(1).isExternal()).isEqualTo(false);

        //Social Links
        //social link 1
        assertThat(footerComponent.getSocialLinks().get(0).getLink()).isEqualTo("https://www.facebook.com/");
        assertThat(footerComponent.getSocialLinks().get(0).hasLinkIcon()).isEqualTo(true);

        //social link 2
        assertThat(footerComponent.getSocialLinks().get(1).getLink()).isEqualTo("https://twitter.com/");
        assertThat(footerComponent.getSocialLinks().get(0).hasLinkIcon()).isEqualTo(true);
    }

    @Override
    protected String getPagePath() {
        return WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH;
    }

    @Override
    protected String getPageXmlFileName() {
        return WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_XML;
    }
}
