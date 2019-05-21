package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.ExternalList;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

@PageObject(css = ".externallist")
public class ExternalListImpl implements ExternalList {

    @Inject
    @CurrentScope
    private WebElement component;

    public String getTitle() {
        return component.findElement(By.tagName("h3")).getText();
    }

    public List<LinkItemImpl> getLinkItems() {
        return component.findElements(By.cssSelector(".cmp-external-list__link"))
        .stream()
        .map(link -> new LinkItemImpl(link.getText(), link.getAttribute("href"), !link.getAttribute("target").isEmpty()))
        .collect(Collectors.toList());
    }

}
