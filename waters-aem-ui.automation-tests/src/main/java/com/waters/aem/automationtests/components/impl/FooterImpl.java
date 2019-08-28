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

@PageObject(css = ".cmp-footer")
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
        return component.findElement(By.cssSelector("div[class='cmp-footer__logo'] > a")).getAttribute("href");
    }

    @Override
    public String getLogoAltText() {
        return component.findElement(By.tagName("img")).getAttribute("alt");
    }

    @Override
    public boolean isExternal() {
        return !component.findElement(By.cssSelector("div[class='cmp-footer__logo'] > a")).getAttribute("target").isEmpty();
    }

    @Override
    public String getCookiesLink() {
        return component.findElement(By.cssSelector(".cmp-footer__links")).findElement(By.linkText("Cookies")).getAttribute("href");
    }

    @Override
    public String getCopyrightText() {
        return component.findElement(By.className("cmp-footer__copyright")).findElement(By.tagName("p")).getText();
    }

    @Override
    public List<LinkItem> getFooterLinks() {
        return component.findElement(By.cssSelector(".cmp-footer__links")).findElements(By.tagName("a"))
        .stream()
        .map(link -> new LinkItemImpl(link.getText(), link.getAttribute("href"), !link.getAttribute("target").isEmpty()))
        .collect(Collectors.toList());
    }

    @Override
    public List<LinkItem> getSocialLinks() {
        return component.findElement(By.cssSelector(".cmp-footer__social-links")).findElements(By.tagName("a"))
        .stream()
        .map(link -> new LinkItemImpl(link.getAttribute("href"), link.findElement(By.tagName("svg")).isDisplayed()))
        .collect(Collectors.toList());
    }
}
