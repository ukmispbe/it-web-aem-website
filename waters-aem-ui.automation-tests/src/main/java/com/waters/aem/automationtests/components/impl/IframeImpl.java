package com.waters.aem.automationtests.components.impl;


import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Iframe;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css = ".cmp-iframe")
public class IframeImpl implements Iframe {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getText() {
        return component.findElement(By.className("cmp-iframe")).getText();
    }
}