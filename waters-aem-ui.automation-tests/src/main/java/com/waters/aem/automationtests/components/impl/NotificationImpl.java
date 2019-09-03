package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.LinkItem;
import com.waters.aem.automationtests.components.Notification;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;


@PageObject(css = ".cmp-notification-wrapper")
public class NotificationImpl implements Notification {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public String getTitle() {
        return component.findElement(By.className("cmp-notification-title")).getText();
    }

    @Override
    public String getDescription() {
        return component.findElement(By.className("cmp-notification-description")).getText();
    }

    @Override
    public String getIcon() {
        return component.findElement(By.tagName("img")).getAttribute("src");
    }

    @Override
    public List<LinkItem> getNotificationItems(){
        return component.findElements(By.tagName("a"))
        .stream()
        .map(link -> new LinkItemImpl(link.getText(), link.getAttribute("href"), !link.getAttribute("target").isEmpty()))
        .collect(Collectors.toList());
    }

}