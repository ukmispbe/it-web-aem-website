package com.waters.aem.automationtests.login;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.api.actions.ActionsController;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.cognifide.qa.bb.page.BobcatPageFactory;
import com.google.inject.Inject;
import com.waters.aem.automationtests.pages.TestPage;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test for presenting how to log in to the page.
 */
@Modules(BobcatRunModule.class)
@Epic("AEM 6.3 Base Tests")
@Feature("Login to AEM")
public class AuthorizationTest {

    @Inject
    private ActionsController controller;

    @Inject
    private BobcatPageFactory bobcatPageFactory;

    @Test
    @Story("Login to AEM and open Test page")
    @Description("Login to author instance and open test page")
    public void loginTest() throws ActionException {
        TestPage testpage = bobcatPageFactory.create("/content/we-retail/us/en.html", TestPage.class);
        controller.execute(AemActions.LOG_IN);
        assertTrue(testpage.open().isDisplayed());
    }
}
