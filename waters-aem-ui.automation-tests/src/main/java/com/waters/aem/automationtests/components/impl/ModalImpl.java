package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Modal;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-modal")
public class ModalImpl implements Modal {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getText() {
        return component.findElement(By.className("cmp-modal__source-text")).getText();
    }

    @Override
    public String getIcon() {
        return component.findElement(By.tagName("img")).getAttribute("src");
    }
}