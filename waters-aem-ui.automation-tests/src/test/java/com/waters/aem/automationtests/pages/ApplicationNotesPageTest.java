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
    public void externalHeader() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("External Header", "External Header", 0,
        new ResourceFileLocation("external-header.yaml")));

        final ExternalHeader externalHeaderComponent = page.getContent(ExternalHeader.class, 0);

        //test Properties Tab
        assertThat(externalHeaderComponent.getLogo().substring(externalHeaderComponent.getLogo().lastIndexOf("/") + 1)).isEqualTo("waters-logo-black.svg");
        assertThat(externalHeaderComponent.getLogoLink().substring(externalHeaderComponent.getLogoLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalHeaderComponent.getLogoAltText()).isEqualTo("Alt Text Test");
        assertThat(externalHeaderComponent.isNewWindow()).isEqualTo(true);

        //Test Header Links Tab
        assertThat(externalHeaderComponent.getSearchPath().substring(externalHeaderComponent.getSearchPath().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalHeaderComponent.getLinkItems().get(0).getText()).isEqualTo("Search Application");
        assertThat(externalHeaderComponent.getLinkItems().get(0).getLink().substring(externalHeaderComponent.getLinkItems().get(0).getLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalHeaderComponent.getLinkItems().get(0).isNewWindow()).isEqualTo(true);
        assertThat(externalHeaderComponent.getLinkItems().get(0).hasLinkIcon()).isEqualTo(true);

        //Test Region Selector Tab
        assertThat(externalHeaderComponent.getLinkItems().get(1).getText()).isEqualTo("EN/US");
        assertThat(externalHeaderComponent.getLinkItems().get(1).getLink().substring(externalHeaderComponent.getLinkItems().get(0).getLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalHeaderComponent.getLinkItems().get(1).isNewWindow()).isEqualTo(false);
        assertThat(externalHeaderComponent.getLinkItems().get(1).hasLinkIcon()).isEqualTo(true);
    }

    @Test
    public void title() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Title", 0,
            new ResourceFileLocation("title.yaml")));

        final Title titleComponent = page.getContent(Title.class, 0);

        assertThat(titleComponent.getText()).isEqualTo("Title Test");
        assertThat(titleComponent.getType()).isEqualTo("h2");
    }

    @Test
    public void text() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Text", 0,
            new ResourceFileLocation("text.yaml")));

        final Text textComponent = page.getContent(Text.class, 0);

        assertThat(textComponent.getTitle()).isEqualTo("Title Test");
        assertThat(textComponent.getText()).isEqualTo("Text Test");
    }

    @Test
    public void anchor() {
        final Anchor anchorComponent = page.getContent(Anchor.class, 0);

        assertThat(anchorComponent.getLinkTitles()).containsExactly("Section 1", "Section 2", "Section 3");
    }

    @Test
    public void image() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Image", 0,
            new ResourceFileLocation("image.yaml")));

        final Image imageComponent = page.getContent(Image.class, 0);

        assertThat(imageComponent.getTitle()).isEqualTo("Title Test");
        assertThat(imageComponent.getSrc().substring(imageComponent.getSrc().lastIndexOf("/") + 1)).isEqualTo("brand-masslynx-software.png");
        assertThat(imageComponent.getAlt()).isEqualTo("Alternative Text Test");
        assertThat(imageComponent.getLink().substring(imageComponent.getLink().lastIndexOf("/") + 1)).isEqualTo("test.html");
    }

    @Test
    public void externalList() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "External List", 0,
        new ResourceFileLocation("external-list.yaml")));

        final ExternalList externalListComponent = page.getContent(ExternalList.class, 0);

        assertThat(externalListComponent.getTitle()).isEqualTo("External List Title Test");

        //Link Item 1
        assertThat(externalListComponent.getLinkItems().get(0).getText()).isEqualTo("Waters Site");
        assertThat(externalListComponent.getLinkItems().get(0).getLink()).isEqualTo("https://www.waters.com/waters/home.htm");
        assertThat(externalListComponent.getLinkItems().get(0).isNewWindow()).isEqualTo(true);

        //Link Item 2
        assertThat(externalListComponent.getLinkItems().get(1).getText()).isEqualTo("ICF");
        assertThat(externalListComponent.getLinkItems().get(1).getLink()).isEqualTo("https://www.icf.com/next");
        assertThat(externalListComponent.getLinkItems().get(1).isNewWindow()).isEqualTo(true);

    }

    @Test
    public void externalFooter() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("External Footer", "External Footer", 0,
            new ResourceFileLocation("external-footer.yaml")));

        final ExternalFooter externalFooterComponent = page.getContent(ExternalFooter.class, 0);

        //test Properties Tab
        assertThat(externalFooterComponent.getLogo().substring(externalFooterComponent.getLogo().lastIndexOf("/") + 1)).isEqualTo("waters-logo-white.svg");
        assertThat(externalFooterComponent.getLogoLink().substring(externalFooterComponent.getLogoLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalFooterComponent.getLogoAltText()).isEqualTo("Alt Text Test");
        assertThat(externalFooterComponent.isNewWindow()).isEqualTo(true);
        assertThat(externalFooterComponent.getCopyrightText()).isEqualTo("© 2019 Waters Corporation. All Rights Reserved.");

        //Test Footer Links Tab
        //Link Item 1
        assertThat(externalFooterComponent.getCookiesLink().substring(externalFooterComponent.getCookiesLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalFooterComponent.getLinkItems().get(0).getText()).isEqualTo("Terms of Use");
        assertThat(externalFooterComponent.getLinkItems().get(0).getLink().substring(externalFooterComponent.getLinkItems().get(0).getLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalFooterComponent.getLinkItems().get(0).isNewWindow()).isEqualTo(true);

        //Link Item 2
        assertThat(externalFooterComponent.getLinkItems().get(1).getText()).isEqualTo("Privacy");
        assertThat(externalFooterComponent.getLinkItems().get(1).getLink().substring(externalFooterComponent.getLinkItems().get(0).getLink().lastIndexOf("/") + 1)).isEqualTo("search.html");
        assertThat(externalFooterComponent.getLinkItems().get(1).isNewWindow()).isEqualTo(false);
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
