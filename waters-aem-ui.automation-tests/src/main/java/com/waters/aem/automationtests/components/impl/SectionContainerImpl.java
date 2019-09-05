package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.SectionContainer;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@PageObject(css=".cmp-section-container")
public class SectionContainerImpl implements SectionContainer {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getTitle() {
        return component.findElement(By.className("cmp-section-container__title")).getText();
    }

    @Override
    public boolean isMobileCollapsed() {
        return component.findElement(By.className("cmp-section-container--collapse")).isEnabled();
    }
}
