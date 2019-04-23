package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Application Notes Page")
@Disabled
public class ApplicationNotesPageTest extends AbstractApplicationNotesPageTest {

    @Override
    public void configureComponent() {
        applicationNotesPage.setTitle(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_TITLE);
    }

    @Test
    public void applicationNotesPageTitleTest() {
        assertTrue(applicationNotesPage.isDisplayed());
    }
}
