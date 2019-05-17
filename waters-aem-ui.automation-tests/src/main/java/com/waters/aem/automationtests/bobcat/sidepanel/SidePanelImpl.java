package com.waters.aem.automationtests.bobcat.sidepanel;

import com.cognifide.qa.bb.aem.core.component.GlobalBarImpl;
import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanel;
import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanelTabBar;
import com.cognifide.qa.bb.constants.HtmlTags;
import com.cognifide.qa.bb.dragdrop.DragAndDropFactory;
import com.cognifide.qa.bb.dragdrop.Draggable;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.FindPageObject;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.cognifide.qa.bb.scope.frame.FramePath;
import com.cognifide.qa.bb.utils.PageObjectInjector;
import com.cognifide.qa.bb.wait.BobcatWait;
import com.cognifide.qa.bb.wait.Timings;
import com.google.inject.Inject;
import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static com.cognifide.qa.bb.constants.HtmlTags.Attributes.CLASS;
import static org.openqa.selenium.support.ui.ExpectedConditions.attributeContains;
import static org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOf;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfAllElements;

/**
 * Override of {@link SidePanel} for AEM 6.3.
 */
@PageObject(css = ".sidepanel")
public class SidePanelImpl implements SidePanel {

    private static final String IS_CLOSED = "sidepanel-closed";

    private static final String COMPONENT_XPATH_FORMAT =
    "//coral-tree-item/div/div/coral-tree-item-content/span/span[@class='editor-ContentTree-itemTitle'and (text()='%s' or text()='%s: ') ]";

    @Inject
    private DragAndDropFactory dragAndDropFactory;

    @Inject
    private BobcatWait bobcatWait;

    @Inject
    private PageObjectInjector pageObjectInjector;

    @Inject
    @CurrentScope
    private WebElement currentScope;

    @FindBy(id = "assetsearch")
    private WebElement searchInput;

    @FindBy(css = ".content-panel .resultspinner")
    private WebElement resultsLoader;

    @FindBy(css = ".content-panel .card-asset")
    private List<WebElement> searchResults;

    @FindPageObject
    private SidePanelTabBar sidePanelTabBar;

    @Override
    public WebElement selectComponentToEdit(String path, String component, int elementNumber) {
        return !path.contains("container") ? getComponentWebElement(component, currentScope) :
            ComponentTreeLocatorHelper.getComponentWebElement(path, component, elementNumber, currentScope);
    }

    @Override
    public void selectTab(String tab) {
        if (isClosed()) {
            pageObjectInjector.inject(GlobalBarImpl.class).toggleSidePanel();
        }

        sidePanelTabBar.switchTab(tab);
    }

    @Override
    public Draggable searchForAsset(String asset) {
        if (isClosed()) {
            pageObjectInjector.inject(GlobalBarImpl.class).toggleSidePanel();
        }

        verifyResultsVisible();
        searchInput.clear();
        searchInput.sendKeys(asset);
        searchInput.sendKeys(Keys.ENTER);
        verifyResultsVisible();

        return dragAndDropFactory.createDraggable(getResult(asset), FramePath.parsePath("/"));
    }

    private boolean isClosed() {
        return bobcatWait.isConditionMet(attributeContains(currentScope, CLASS, IS_CLOSED));
    }

    private void verifyResultsVisible() {
        bobcatWait.tweak(Timings.MEDIUM_EXPLICIT).until(invisibilityOf(resultsLoader));

        bobcatWait.tweak(Timings.MEDIUM_EXPLICIT).ignoring(StaleElementReferenceException.class)
        .until(visibilityOfAllElements(searchResults));
    }

    private WebElement getResult(String asset) {
        return searchResults.stream() //
        .filter(element -> StringUtils
        .contains(element.getAttribute(HtmlTags.Attributes.DATA_PATH), asset)) //
        .findFirst() //
        .orElseThrow(() -> new IllegalStateException(asset + " asset was not found"));
    }

    public WebElement getComponentWebElement(String componentName, WebElement currentScope) {
        return currentScope.findElement(By.xpath(String.format(COMPONENT_XPATH_FORMAT, componentName, componentName)));
    }

}
