package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingDataXMLBuilder;
import com.cognifide.qa.bb.aem.core.pages.sling.SlingPageData;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.api.actions.ActionsController;
import com.cognifide.qa.bb.page.BobcatPageFactory;
import com.google.inject.Inject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

public abstract class AbstractWatersPageTest {

    @Inject
    protected ActionsController controller;

    @Inject
    protected BobcatPageFactory bobcatPageFactory;

    protected WatersPage page;

    protected abstract String getPagePath();

    protected abstract String getPageXmlFileName();

    @BeforeEach
    public void loginAndCreatePage() throws ActionException {
        controller.execute(AemActions.LOG_IN);

        final SlingPageData pageData = new SlingPageData(getPagePath(),
            SlingDataXMLBuilder.buildFromFile(getPageXmlFileName()));

        // create page
        controller.execute(AemActions.CREATE_PAGE_VIA_SLING, pageData);

        final String editorPagePath = new StringBuilder("/editor.html")
            .append(getPagePath())
            .append(".html")
            .toString();

        // open page
        page = bobcatPageFactory.create(editorPagePath, WatersPage.class).open();
    }

    @AfterEach
    public void deletePage() throws ActionException {
        controller.execute(AemActions.DELETE_PAGE_VIA_SLING, new SlingPageData(getPagePath()));
    }
}
