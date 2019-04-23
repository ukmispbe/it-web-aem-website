package com.waters.aem.automationtests.components.impl;

import com.adobe.cq.wcm.core.components.models.Title;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-title")
public class TitleImpl implements Title {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getText() {
        return component.findElement(By.tagName("h2")).getText();
    }

    @Override
    public String getType() {
        return component.findElements(By.xpath(".//")).get(0).getTagName();
    }
}
