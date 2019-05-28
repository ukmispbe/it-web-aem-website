package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Button;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-button")
public class ButtonImpl implements Button {

    @Inject
    @CurrentScope
    private WebElement component;

    public String getButtonText() {
        return component.getText();
    }

    public String getButtonToolTip() {
        return component.getAttribute("title");
    }

    public String getButtonHref() {
        return component.getAttribute("href");
    }

    public boolean isNewWindow() {
        return !component.getAttribute("target").isEmpty();
    }
}
