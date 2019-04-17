package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingDataXMLBuilder;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingPageData;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.api.actions.ActionsController;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.cognifide.qa.bb.page.BobcatPageFactory;
import com.google.inject.Inject;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Application Notes Page")
@Disabled
public class ApplicationNotesPageTest {

    @Inject
    private ActionsController controller;

    @Inject
    private BobcatPageFactory bobcatPageFactory;

    @BeforeEach
    public void loginAndCreateApplicationNotesPage() throws ActionException {
        // super.loginAndCreateApplicationNotesPage();
        controller.execute(AemActions.LOG_IN);

        final SlingPageData pageData = new SlingPageData(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH,
            SlingDataXMLBuilder.buildFromFile(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_XML));

        controller.execute(AemActions.CREATE_PAGE_VIA_SLING, pageData);
    }

    @Test
    public void applicationNotesPageTitleTest() {
        final ApplicationNotesPage applicationNotesPage = bobcatPageFactory.create(
            "/editor.html" + WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH + ".html",
            ApplicationNotesPage.class);

        applicationNotesPage.setTitle(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_TITLE);

        assertTrue(applicationNotesPage.open().isDisplayed());
    }

    @AfterEach
    public void deleteApplicationNotesPage() throws ActionException {
        controller.execute(AemActions.DELETE_PAGE_VIA_SLING,
            new SlingPageData(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH));
    }
}
