package com.waters.aem.automationtests.pages;

import com.cognifide.qa.bb.aem.core.pages.AemAuthorPage;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.cognifide.qa.bb.wait.BobcatWait;
import com.google.inject.Inject;
import org.openqa.selenium.support.ui.ExpectedConditions;

@PageObject
public class ApplicationNotesPage extends AemAuthorPage<ApplicationNotesPage> {

    @Inject
    private BobcatWait bobcatWait;

    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isDisplayed() {
        return bobcatWait.isConditionMet(ExpectedConditions.titleIs(getTitle()));
    }
}
