package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Title;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-title")
public class TitleImpl implements Title {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getText() {
        return component.findElement(By.className("cmp-title__text")).getText();
    }

    @Override
    public String getType() {
        return component.findElements(By.cssSelector("*")).get(0).getTagName();
    }
}
