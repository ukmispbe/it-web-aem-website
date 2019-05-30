package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ResourceFileLocation;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.components.Image;
import com.waters.aem.automationtests.components.Title;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Search Page")
public class SearchPageTest extends AbstractWatersPageTest {

    @Test
    public void banner() throws ActionException {
        configureBannerTitle();
        configureBannerimage();

        final Title bannerTitleComponent = page.getContent(Title.class, 0);

        assertThat(bannerTitleComponent.getText()).isEqualTo("Search Library");
        assertThat(bannerTitleComponent.getType()).isEqualTo("h1");

        final Image bannerImageComponent = page.getContent(Image.class, 0);

        assertThat(bannerImageComponent.getTitle()).isEqualTo("Title Test");
        assertThat(bannerImageComponent.getSrc().substring(bannerImageComponent.getSrc().lastIndexOf("/") + 1)).isEqualTo("brand-masslynx-software.png");
        assertThat(bannerImageComponent.getAlt()).isEqualTo("Alternative Text Test");
        assertThat(bannerImageComponent.getLink().substring(bannerImageComponent.getLink().lastIndexOf("/") + 1)).isEqualTo("test.html");
    }

    public void configureBannerTitle() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Title", 0,
        new ResourceFileLocation("banner-title.yaml")));
    }

    public void configureBannerimage() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("Image", "Image", 0,
        new ResourceFileLocation("image.yaml")));
    }

    @Override
    protected String getPagePath() {
        return WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH;
    }

    @Override
    protected String getPageXmlFileName() {
        return WatersAutomationTestConstants.SEARCH_PAGE_XML;
    }
}
