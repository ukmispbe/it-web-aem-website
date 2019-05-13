package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ResourceFileLocation;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.components.Anchor;
import com.waters.aem.automationtests.components.Image;
import com.waters.aem.automationtests.components.Text;
import com.waters.aem.automationtests.components.Title;
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

    @Override
    protected String getPagePath() {
        return WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH;
    }

    @Override
    protected String getPageXmlFileName() {
        return WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_XML;
    }
}
