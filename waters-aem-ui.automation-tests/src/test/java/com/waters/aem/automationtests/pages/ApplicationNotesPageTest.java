package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ResourceFileLocation;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.components.Text;
import com.waters.aem.automationtests.components.Title;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static org.assertj.core.api.Assertions.assertThat;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Application Notes Page")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ApplicationNotesPageTest extends AbstractWatersPageTest {

    @Test
    public void title() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Title", 0,
            new ResourceFileLocation("title.yaml")));

        final Title titleComponent = page.getContent(Title.class, 0);

        assertThat(titleComponent.getText().equals("Title Test"));
        assertThat(titleComponent.getType().equals("h2"));
    }

    @Test
    public void text() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Text", 0,
            new ResourceFileLocation("text.yaml")));

        final Text textComponent = page.getContent(Text.class, 0);

        assertThat(textComponent.getTitle().equals("Title Test"));
        assertThat(textComponent.getText().equals("Text Test"));
    }

    @Test
    @Disabled
    public void anchor() {

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
