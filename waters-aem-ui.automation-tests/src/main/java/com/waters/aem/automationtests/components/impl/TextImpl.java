package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Text;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-text")
public class TextImpl implements Text {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getTitle() {
        return component.findElement(By.tagName("h3")).getText();
    }

    @Override
    public String getText() {
        return component.findElement(By.tagName("p")).getText();
    }
}
