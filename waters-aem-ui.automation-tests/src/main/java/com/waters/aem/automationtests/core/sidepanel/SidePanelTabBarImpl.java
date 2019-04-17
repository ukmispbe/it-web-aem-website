package com.waters.aem.automationtests.core.sidepanel;

import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanelTabBar;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.cognifide.qa.bb.wait.BobcatWait;
import com.google.inject.Inject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static com.cognifide.qa.bb.webelement.WebElementConditions.elementIsReady;

/**
 * Override of {@link SidePanelTabBar} for AEM 6.3.
 */
@PageObject(css = ".coral-TabList")
public class SidePanelTabBarImpl implements SidePanelTabBar {

    @Inject
    @CurrentScope
    private WebElement currentScope;

    @Inject
    private BobcatWait bobcatWait;

    @Override
    public void switchTab(String tab) {
        bobcatWait.until(elementIsReady(currentScope.findElement(By.className(tab)))).click();
    }
}
