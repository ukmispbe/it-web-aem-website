package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Application Notes Page")
public class ApplicationNotesPageTest extends AbstractApplicationNotesPageTest {

    @BeforeEach
    @Override
    public void loginAndCreateApplicationNotesPage() throws ActionException {
        super.loginAndCreateApplicationNotesPage();
    }

    @Test
    public void applicationNotesPageTitleTest() {
        applicationNotesPage.setTitle(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_TITLE);

        assertTrue(applicationNotesPage.isDisplayed());
    }

    @AfterEach
    @Override
    public void deleteApplicationNotesPage() throws ActionException {
        super.deleteApplicationNotesPage();
    }
}
