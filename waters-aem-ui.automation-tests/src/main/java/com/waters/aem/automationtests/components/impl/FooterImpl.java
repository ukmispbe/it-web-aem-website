package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Footer;
import com.waters.aem.automationtests.components.LinkItem;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

@PageObject(css = ".cmp-external-footer")
public class FooterImpl implements Footer {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getLogo() {
        return component.findElement(By.tagName("img")).getAttribute("src");
    }

    @Override
    public String getLogoLink() {
        return component.findElement(By.cssSelector("div[class='cmp-external-footer__logo'] > a")).getAttribute("href");
    }

    @Override
    public String getLogoAltText() {
        return component.findElement(By.tagName("img")).getAttribute("alt");
    }

    @Override
    public boolean isNewWindow() {
        return !component.findElement(By.cssSelector("div[class='cmp-external-footer__logo'] > a")).getAttribute("target").isEmpty();
    }

    @Override
    public String getCookiesLink() {
        return component.findElement(By.cssSelector(".cmp-external-footer__links")).findElement(By.linkText("Cookies")).getAttribute("href");
    }

    @Override
    public String getCopyrightText() {
        return component.findElement(By.className("cmp-external-footer__copyright")).findElement(By.tagName("p")).getText();
    }

    @Override
    public List<LinkItem> getLinkItems() {
        return component.findElement(By.cssSelector(".cmp-external-footer__links")).findElements(By.tagName("a"))
        .stream()
        .map(link -> new LinkItemImpl(link.getText(), link.getAttribute("href"), !link.getAttribute("target").isEmpty()))
        .collect(Collectors.toList());
    }
}
