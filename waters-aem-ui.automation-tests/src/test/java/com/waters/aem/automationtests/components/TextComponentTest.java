package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ResourceFileLocation;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingDataXMLBuilder;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingPageData;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.api.actions.ActionsController;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.cognifide.qa.bb.page.BobcatPageFactory;
import com.google.inject.Inject;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import com.waters.aem.automationtests.pages.ApplicationNotesPage;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Text Component")
public class TextComponentTest {

    @Inject
    private ActionsController controller;

    @Inject
    private BobcatPageFactory bobcatPageFactory;

    @BeforeEach
    public void loginAndCreateApplicationNotesPage() throws ActionException {
        controller.execute(AemActions.LOG_IN);

        final SlingPageData pageData = new SlingPageData(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH,
            SlingDataXMLBuilder.buildFromFile(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_XML));

        controller.execute(AemActions.CREATE_PAGE_VIA_SLING, pageData);
    }

    @Test
    public void getTitle() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Text", 0,
            new ResourceFileLocation("text.yaml")));

        final Text textComponent = getApplicationNotesPage().getContent(Text.class, 0);

        assertThat(textComponent.getTitle().equals("Text Component Title"));
    }

    @Test
    public void getText() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Text", 0,
            new ResourceFileLocation("text.yaml")));

        final Text textComponent = getApplicationNotesPage().getContent(Text.class, 0);

        assertThat(textComponent.getTitle().equals("Text Component Text"));
    }

    @AfterEach
    public void deleteApplicationNotesPage() throws ActionException {
        controller.execute(AemActions.DELETE_PAGE_VIA_SLING,
            new SlingPageData(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH));
    }

    private ApplicationNotesPage getApplicationNotesPage() {
        return bobcatPageFactory.create(
            "/editor.html" + WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH + ".html",
            ApplicationNotesPage.class);
    }
}
