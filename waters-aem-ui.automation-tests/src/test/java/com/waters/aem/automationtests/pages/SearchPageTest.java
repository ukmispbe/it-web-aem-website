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
        //controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Banner", 0,
        //new ResourceFileLocation("title.yaml")));

        //bannerTitle();

        image();

        final Title bannerComponent = page.getContent(Title.class, 0);

       // assertThat(titleComponent.getText()).isEqualTo("Title Test");
        //assertThat(titleComponent.getType()).isEqualTo("h2");
    }


    public void bannerTitle() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container[1]", "Title", 0,
        new ResourceFileLocation("banner-title.yaml")));

        final Title titleComponent = page.getContent(Title.class, 0);
    }

    public void image() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("Image", "Image", 0,
        new ResourceFileLocation("image.yaml")));

        final Image imageComponent = page.getContent(Image.class, 0);

        //assertThat(imageComponent.getTitle()).isEqualTo("Title Test");
        //assertThat(imageComponent.getSrc().substring(imageComponent.getSrc().lastIndexOf("/") + 1)).isEqualTo("brand-masslynx-software.png");
        //assertThat(imageComponent.getAlt()).isEqualTo("Alternative Text Test");
        //assertThat(imageComponent.getLink().substring(imageComponent.getLink().lastIndexOf("/") + 1)).isEqualTo("test.html");
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
