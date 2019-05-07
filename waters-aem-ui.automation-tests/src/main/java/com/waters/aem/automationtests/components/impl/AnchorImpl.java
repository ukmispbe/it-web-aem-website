package com.waters.aem.automationtests.components.impl;

import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.components.Anchor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

@PageObject(css = ".cmp-anchor")
public class AnchorImpl implements Anchor {

    @Inject
    @CurrentScope
    private WebElement component;

    @Override
    public List<String> getLinkTitles() {
        return component.findElements(By.tagName("a"))
            .stream()
            .map(element -> element.getText())
            .collect(Collectors.toList());
    }
}
