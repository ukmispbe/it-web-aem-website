package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Header;
import com.waters.aem.automationtests.components.LinkItem;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

@PageObject(css = ".cmp-external-header")
public class HeaderImpl implements Header {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getLogo() {
        return component.findElement(By.tagName("img")).getAttribute("src");
    }

    @Override
    public String getLogoLink() {
        return component.findElement(By.className("cmp-external-header-logo__link")).getAttribute("href");
    }

    @Override
    public String getLogoAltText() {
        return component.findElement(By.tagName("img")).getAttribute("alt");
    }

    @Override
    public boolean isNewWindow(){
        return !component.findElement(By.className("cmp-external-header-logo__link")).getAttribute("target").isEmpty();
    }

    @Override
    public String getSearchPath() {
        return component.getAttribute("data-search-path");
    }

    @Override
    public List<LinkItem> getLinkItems() {
        return component.findElements(By.cssSelector(".cmp-external-header-links__link"))
        .stream()
        .map(link -> new LinkItemImpl(link.getText(), link.getAttribute("href"), link.findElement(By.tagName("svg")).isDisplayed(), !link.getAttribute("target").isEmpty()))
        .collect(Collectors.toList());
    }

}
