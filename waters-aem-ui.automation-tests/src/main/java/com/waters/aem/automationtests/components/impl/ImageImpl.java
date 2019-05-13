package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Image;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-image")
public class ImageImpl implements Image {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getTitle() {
        return component.findElement(By.tagName("h3")).getText();
    }

    @Override
    public String getSrc() {
        return component.findElement(By.tagName("img")).getAttribute("src");
    }

    @Override
    public String getAlt() {
        return component.findElement(By.tagName("img")).getAttribute("alt");
    }

    @Override
    public String getLink() {
        return component.findElement(By.tagName("a")).getAttribute("href");
    }

}
