package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingDataXMLBuilder;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingPageData;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.api.actions.ActionsController;
import com.cognifide.qa.bb.page.BobcatPageFactory;
import com.google.inject.Inject;
import com.waters.aem.automationtests.constants.WatersAutomationTestConstants;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

public abstract class AbstractApplicationNotesPageTest {

    @Inject
    protected ActionsController controller;

    @Inject
    protected BobcatPageFactory bobcatPageFactory;

    protected ApplicationNotesPage applicationNotesPage;

    /**
     * Configure the component to be tested.
     *
     * @throws ActionException if error occurs configuring component
     */
    public abstract void configureComponent() throws ActionException;

    @BeforeEach
    public void loginAndCreateApplicationNotesPage() throws ActionException {
        controller.execute(AemActions.LOG_IN);

        final SlingPageData pageData = new SlingPageData(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH,
            SlingDataXMLBuilder.buildFromFile(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_XML));

        // create page
        controller.execute(AemActions.CREATE_PAGE_VIA_SLING, pageData);

        final String path = new StringBuilder("/editor.html")
            .append(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH)
            .append(".html")
            .toString();

        // open page
        applicationNotesPage = bobcatPageFactory.create(path, ApplicationNotesPage.class).open();

        configureComponent();
    }

    @AfterEach
    public void deleteApplicationNotesPage() throws ActionException {
        controller.execute(AemActions.DELETE_PAGE_VIA_SLING,
            new SlingPageData(WatersAutomationTestConstants.APPLICATION_NOTES_PAGE_PATH));
    }
}
