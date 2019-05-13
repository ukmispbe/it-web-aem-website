package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;


@PageObject(css = ".cmp-banner")
public class BannerImpl {

    @Inject
    @CurrentScope
    private WebElement component;

    @FindBy(css = ".cmp-title")
    private WebElement title;

    @FindBy(css = ".cmp-search-bar")
    private WebElement searchBar;
}
