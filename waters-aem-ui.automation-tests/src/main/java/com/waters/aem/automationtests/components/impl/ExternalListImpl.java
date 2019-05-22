package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.ExternalList;
import com.waters.aem.automationtests.components.LinkItem;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

@PageObject(css = ".externallist")
public class ExternalListImpl implements ExternalList {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getTitle() {
        return component.findElement(By.tagName("h3")).getText();
    }

    @Override
    public List<LinkItem> getLinkItems() {
        return component.findElements(By.cssSelector(".cmp-external-list__link"))
        .stream()
        .map(link -> new LinkItemImpl(link.getText(), link.getAttribute("href"), !link.getAttribute("target").isEmpty()))
        .collect(Collectors.toList());
    }

}
